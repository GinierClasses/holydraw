using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public class WebsocketHandler : IWebsocketHandler
    {
        private List<SocketConnection> _websocketConnections = new();

        public WebsocketHandler()
        {
            SetupCleanUpTask();
        }

        public async Task Handle(Guid id, WebSocket webSocket)
        {
            lock (_websocketConnections)
            {
                _websocketConnections.Add(new SocketConnection
                {
                    Id = id,
                    WebSocket = webSocket,
                    RoomId = null
                });
            }

            // we handle message from Player only for authentificate
            while (webSocket.State == WebSocketState.Open)
            {
                var message = await ReceiveMessage(id, webSocket);
                if (message == null) continue;

                var connection = _websocketConnections.Find(w => w.Id == id);

                if (connection == null || connection.RoomId != null) continue;
                // deserialize message from Player
                var socketJson = JsonSerializer.Deserialize<ConnexionSocketMessage>(
                    message,
                    new JsonSerializerOptions {AllowTrailingCommas = true});

                var playerToken = socketJson?.PlayerToken;

                var player = playerToken == null ? null : await new PlayerDataProvider().GetPlayerByToken(playerToken);
                // if no matching token or no token
                if (player == null)
                {
                    await SendMessageToSocket(connection, JsonSerializer.Serialize(
                        new BaseWebsocketEvent(WebsocketEvent.Invalid)));
                    continue;
                }

                if (!player.IsConnected)
                    await new PlayerDataProvider().SetIsConnected(player.Id, true);

                connection.RoomId = player.RoomId;
                connection.PlayerId = player.Id;

                // inform room that a new player join
                await SendMessageToSockets(
                    JsonSerializer.Serialize(
                        new BaseWebsocketEvent(WebsocketEvent.PlayerJoin)), player.RoomId);
            }
        }

        /// <summary>
        ///     Send a message to websocket matching with the RoomId
        /// </summary>
        /// <param name="message">Message to send, stringify if Json</param>
        /// <param name="roomId">Id of the room to send</param>
        /// <returns></returns>
        public async Task SendMessageToSockets(string message, int? roomId = null)
        {
            IEnumerable<SocketConnection> toSentTo;

            lock (_websocketConnections)
            {
                toSentTo = roomId == null
                    ? _websocketConnections.ToList()
                    : _websocketConnections.Where(w => w.RoomId == roomId).ToList();
            }

            var tasks = toSentTo.Select(async websocketConnection =>
            {
                await SendMessageToSocket(websocketConnection, message);
            });
            await Task.WhenAll(tasks);
        }

        private static async Task<string> ReceiveMessage(Guid id, WebSocket webSocket)
        {
            var arraySegment = new ArraySegment<byte>(new byte[4096]);
            var receivedMessage = await webSocket.ReceiveAsync(arraySegment, CancellationToken.None);
            if (receivedMessage.MessageType == WebSocketMessageType.Text)
            {
                var message = Encoding.Default.GetString(arraySegment).TrimEnd('\0');
                return message;
            }

            return null;
        }

        private static async Task SendMessageToSocket(SocketConnection socketConnection, string message)
        {
            if (socketConnection.WebSocket.State == WebSocketState.Open)
            {
                var bytes = Encoding.Default.GetBytes(message);
                var arraySegment = new ArraySegment<byte>(bytes);
                await socketConnection.WebSocket.SendAsync(arraySegment, WebSocketMessageType.Text, true,
                    CancellationToken.None);
            }
        }

        private void SetupCleanUpTask()
        {
            Task.Run(async () =>
            {
                while (true)
                {
                    IEnumerable<SocketConnection> openSockets;
                    IEnumerable<SocketConnection> closedSockets;

                    lock (_websocketConnections)
                    {
                        openSockets = _websocketConnections.Where(x =>
                            x.WebSocket.State == WebSocketState.Open || x.WebSocket.State == WebSocketState.Connecting);
                        closedSockets = _websocketConnections.Where(x =>
                            x.WebSocket.State != WebSocketState.Open && x.WebSocket.State != WebSocketState.Connecting);

                        _websocketConnections = openSockets.ToList();
                    }

                    foreach (var closedWebsocketConnection in closedSockets)
                    {
                        // update player who leave to unconnected
                        await new PlayerDataProvider().SetIsConnected(
                            closedWebsocketConnection.PlayerId ?? -1, false);
                        await SendMessageToSockets(
                            JsonSerializer.Serialize(
                                new BaseWebsocketEvent(WebsocketEvent.PlayerLeft)), closedWebsocketConnection.RoomId);
                    }

                    await Task.Delay(5000);
                }
            });
        }
    }

    public class SocketConnection
    {
        public Guid Id { get; set; }
        public WebSocket WebSocket { get; set; }
        public int? RoomId { get; set; }
        public int? PlayerId { get; set; }
    }
}
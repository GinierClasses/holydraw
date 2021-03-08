using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using thyrel_api.DataProvider;
using thyrel_api.Json;
using thyrel_api.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace thyrel_api.Websocket
{
    public class WebsocketHandler : IWebsocketHandler
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private List<SocketConnection> _websocketConnections = new();

        public WebsocketHandler(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
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

            // we handle message from Player only for authenticate
            while (webSocket.State == WebSocketState.Open)
            {
                var message = await ReceiveMessage(webSocket);
                if (message == null) continue;

                var connection = _websocketConnections.Find(w => w.Id == id);

                if (connection == null || connection.RoomId != null) continue;
                // deserialize message from Player
                var socketJson = JsonConvert.DeserializeObject<ConnexionSocketMessage>(message);

                var playerToken = socketJson?.PlayerToken;
                var playerDataProvider = new PlayerDataProvider(GetInjectedContext());

                var player = playerToken == null ? null : await playerDataProvider.GetPlayerByToken(playerToken);
                // if no matching token or no token
                if (player == null)
                {
                    await SendMessageToSocket(connection, Json.Json.Serialize(
                        new BaseWebsocketEventJson(WebsocketEvent.Invalid)));
                    continue;
                }

                if (!player.IsConnected)
                    player = await playerDataProvider.SetIsConnected(player.Id, true);

                connection.RoomId = player.RoomId;
                connection.PlayerId = player.Id;
                // remove token locally (not in the DB)
                player.Token = null;

                // inform room that a new player join
                await SendMessageToSockets(
                    Json.Json.Serialize(
                        new PlayerWebsocketEventJson(WebsocketEvent.PlayerJoin, player)), player.RoomId);
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

        private static async Task<string> ReceiveMessage(WebSocket webSocket)
        { 
            var arraySegment = new ArraySegment<byte>(new byte[4096]);
            var receivedMessage = await webSocket.ReceiveAsync(arraySegment, CancellationToken.None);
            if (receivedMessage.MessageType != WebSocketMessageType.Text) return null;

            var message = Encoding.Default.GetString(arraySegment).TrimEnd('\0');
            return message;
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
                    List<SocketConnection> openSockets;
                    List<SocketConnection> closedSockets;

                    lock (_websocketConnections)
                    {
                        openSockets = _websocketConnections.Where(socket =>
                            socket.WebSocket.State == WebSocketState.Open || socket.WebSocket.State == WebSocketState.Connecting)
                            .ToList();
                        closedSockets = _websocketConnections.Where(socket =>
                            socket.WebSocket.State != WebSocketState.Open && socket.WebSocket.State != WebSocketState.Connecting)
                            .ToList();

                        _websocketConnections = openSockets;
                    }

                    foreach (var closedSocket in closedSockets.Where(closedSocket => openSockets.All(s => s.PlayerId != closedSocket.PlayerId)))
                    {
                        await SendMessageToSockets(
                            Json.Json.Serialize(
                                new PlayerIdWebsocketEventJson(WebsocketEvent.PlayerLeft, closedSocket.PlayerId)), closedSocket.RoomId);
                        if (closedSocket.PlayerId == null) continue;

                        var playerDataProvider = new PlayerDataProvider(GetInjectedContext());
                        
                        var player = await playerDataProvider.SetIsConnected(
                            (int) closedSocket.PlayerId, false);
                        if (!player.IsOwner) continue;
                        
                        var newOwnerPlayer = await playerDataProvider.FindNewOwner(player.RoomId);
                        if (newOwnerPlayer == null) continue;
                        
                        await playerDataProvider.SetOwner(player, false);
                        await SendMessageToSockets(
                            Json.Json.Serialize(
                                new PlayerWebsocketEventJson(WebsocketEvent.NewOwnerPlayer, newOwnerPlayer)), closedSocket.RoomId);
                    }

                    await Task.Delay(5000);
                }
            });
        }

        private HolyDrawDbContext GetInjectedContext()
        {
            var scope = _scopeFactory.CreateScope();
            return scope.ServiceProvider.GetRequiredService<HolyDrawDbContext>();
        }
    }
}
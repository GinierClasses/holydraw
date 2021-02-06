using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace thyrel_api.Websocket
{
    public class WebsocketHandler : IWebsocketHandler
    {
        public List<SocketConnection> websocketConnections = new List<SocketConnection>();

        public WebsocketHandler()
        {
            SetupCleanUpTask();
        }

        public async Task Handle(Guid id,WebSocket webSocket)
        {
            lock (websocketConnections) { 
                websocketConnections.Add(new SocketConnection { 
                    Id = id,
                    WebSocket = webSocket,
                    RoomId = null,
                });
            }

            await SendMessageToSockets($"User with id <b>{id}</b> has joined the chat");

            while (webSocket.State == WebSocketState.Open)
            {
                var message = await ReceiveMessage(id, webSocket);
                if (message != null)
                {
                    var options = new JsonSerializerOptions
                    {
                        AllowTrailingCommas = true
                    };
                    var calledConnection = websocketConnections.Find(w => w.Id == id);

                    if (calledConnection != null && calledConnection.RoomId == null)
                    {
                        var socketJson =  JsonSerializer.Deserialize<RoomSocketJson>(message, options);
                        if (socketJson != null) calledConnection.RoomId = socketJson.RoomId;
                    }
                    
                    await SendMessageToSockets(message);
                }

            }
        }

        private async Task<string> ReceiveMessage(Guid id, WebSocket webSocket)
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

        /// <summary>
        /// Send a message to websocket matching with the RoomId
        /// </summary>
        /// <param name="message">Message to send, stringify if Json</param>
        /// <param name="roomId">Id of the room to send</param>
        /// <returns></returns>
        public async Task SendMessageToSockets(string message, int? roomId = null)
        {
            IEnumerable<SocketConnection> toSentTo;

            lock (websocketConnections)
            {
                toSentTo = roomId == null ? 
                    websocketConnections.ToList() : 
                    websocketConnections.Where(w => w.RoomId == roomId).ToList();
            }

            var tasks = toSentTo.Select(async websocketConnection =>
            {
                if (websocketConnection.WebSocket.State == WebSocketState.Open) { 
                   var bytes = Encoding.Default.GetBytes(message);
                   var arraySegment = new ArraySegment<byte>(bytes);
                   await websocketConnection.WebSocket.SendAsync(arraySegment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
            });
            await Task.WhenAll(tasks);
        }

        private void SetupCleanUpTask()
        {
            Task.Run(async () =>
            {
                while (true)
                {
                    IEnumerable<SocketConnection> openSockets;
                    IEnumerable<SocketConnection> closedSockets;

                    lock (websocketConnections)
                    {
                        openSockets = websocketConnections.Where(x => x.WebSocket.State == WebSocketState.Open || x.WebSocket.State == WebSocketState.Connecting);
                        closedSockets = websocketConnections.Where(x => x.WebSocket.State != WebSocketState.Open && x.WebSocket.State != WebSocketState.Connecting);

                        websocketConnections = openSockets.ToList();
                    }

                    foreach (var closedWebsocketConnection in closedSockets)
                    {
                        await SendMessageToSockets($"{closedWebsocketConnection.Id} disc");
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

    public class RoomSocketJson
    {
        public int PlayerId { get; set; }
        public int? RoomId { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public class WebsocketHandler : IWebsocketHandler
    {
        private readonly IConfiguration _configuration;
        private readonly WebsocketService _websocketService;
        private List<SocketConnection> _websocketConnections = new();

        public WebsocketHandler(IConfiguration configuration)
        {
            _configuration = configuration;
            _websocketService = new WebsocketService(this);
            SetupCleanUpTask();
        }

        public async Task Handle(Guid id, WebSocket webSocket)
        {
            lock (_websocketConnections)
                _websocketConnections.Add(new SocketConnection
                {
                    Id = id,
                    WebSocket = webSocket
                });

            while (webSocket.State == WebSocketState.Open)
            {
                var message = await ReceiveMessage(webSocket);
                if (message == null) continue;

                SocketConnection connection;
                lock (_websocketConnections)
                    connection = _websocketConnections.Find(w => w.Id == id);

                if (connection == null || connection.RoomId != null) continue;

                var context = CreateContext();
                await _websocketService.MessageService(connection, message, context);
                await context.DisposeAsync();
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

        public static async Task SendMessageToSocket(SocketConnection socketConnection, string message)
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
                                socket.WebSocket.State == WebSocketState.Open ||
                                socket.WebSocket.State == WebSocketState.Connecting)
                            .ToList();
                        closedSockets = _websocketConnections.Where(socket =>
                                socket.WebSocket.State != WebSocketState.Open &&
                                socket.WebSocket.State != WebSocketState.Connecting)
                            .ToList();

                        _websocketConnections = openSockets;
                    }

                    foreach (var closedSocket in closedSockets.Where(closedSocket =>
                        openSockets.All(s => s.PlayerId != closedSocket.PlayerId)))
                    {
                        var context = CreateContext();
                        await _websocketService.DisconnectService(closedSocket, context);
                        await context.DisposeAsync();
                    }

                    await Task.Delay(5000);
                }
            });
        }

        /// <summary>
        /// Dispose the context after using it !
        /// `await context.DisposeAsync();`
        /// </summary>
        /// <returns>Context able to be used</returns>
        private HolyDrawDbContext CreateContext()
        {
            var connectionString = _configuration.GetConnectionString("thyrel_db") == null
                ? Environment.GetEnvironmentVariable("THYREL_CONNECTION_STRING")
                : _configuration.GetConnectionString("thyrel_db"); 

            var optionsBuilder = new DbContextOptionsBuilder<HolyDrawDbContext>();
            optionsBuilder.UseMySql(
                connectionString ?? throw new InvalidOperationException("No connection string, on WebsocketHandler"),
                new MySqlServerVersion(new Version(8, 0, 23)),
                mySqlOptions => mySqlOptions
                    .CharSetBehavior(CharSetBehavior.NeverAppend));
            return new HolyDrawDbContext(optionsBuilder.Options);
        }
    }
}

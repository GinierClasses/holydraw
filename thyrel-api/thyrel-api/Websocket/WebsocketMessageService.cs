using System;
using System.Threading.Tasks;
using thyrel_api.DataProvider;
using thyrel_api.Json;
using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public class WebsocketService
    {
        private readonly WebsocketHandler _websocketHandler;

        public WebsocketService(WebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        public async Task MessageService(SocketConnection socketConnection, string message, HolyDrawDbContext context)
        {
            var socketMessage = JsonBase.Deserialize<SocketMessageBase>(message);

            switch (socketMessage.Type)
            {
                case SendMessageType.Authentication:
                    await SendAuthenticationMessage(socketConnection, message, context);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public async Task DisconnectService(SocketConnection closedSocket, HolyDrawDbContext context)
        {
            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new PlayerIdWebsocketEventJson(WebsocketEvent.PlayerLeft, closedSocket.PlayerId)),
                closedSocket.RoomId);
            if (closedSocket.PlayerId == null) return;

            var playerDataProvider = new PlayerDataProvider(context);

            var player = await playerDataProvider.SetIsConnected(
                (int) closedSocket.PlayerId, false);

            if (!player.IsOwner || player.RoomId == null) return;

            var newOwnerPlayer = await playerDataProvider.FindNewOwner((int) player.RoomId);
            if (newOwnerPlayer == null)
            {
                await new RoomDataProvider(context).Finish(player.RoomId);
                return;
            }

            await playerDataProvider.SetOwner(player, false);
            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new PlayerWebsocketEventJson(WebsocketEvent.NewOwnerPlayer, newOwnerPlayer)),
                closedSocket.RoomId);
        }

        private async Task SendAuthenticationMessage(SocketConnection socketConnection, string message,
            HolyDrawDbContext context)
        {
            var authentication = JsonBase.Deserialize<SocketMessageAuthentication>(message);
            var playerToken = authentication?.PlayerToken;
            var playerDataProvider = new PlayerDataProvider(context);

            var player = playerToken == null
                ? null
                : await playerDataProvider.GetPlayerByToken(playerToken);

            if (player == null)
            {
                await WebsocketHandler.SendMessageToSocket(socketConnection, JsonBase.Serialize(
                    new ErrorWebsocketEventJson("You haven't joined a game yet.")));
                return;
            }

            if (player.Room.FinishAt != null)
            {
                await WebsocketHandler.SendMessageToSocket(socketConnection, JsonBase.Serialize(
                    new ErrorWebsocketEventJson("The game you are trying to join is over.")));
                return;
            }

            if (!player.IsConnected)
                player = await playerDataProvider.SetIsConnected(player.Id, true);

            socketConnection.RoomId = player.RoomId;
            socketConnection.PlayerId = player.Id;

            // inform room that a new player join
            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new PlayerWebsocketEventJson(WebsocketEvent.PlayerJoin, player)), player.RoomId);
        }
    }
}
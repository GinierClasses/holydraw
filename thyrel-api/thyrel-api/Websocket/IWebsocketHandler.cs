using System;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace thyrel_api.Websocket
{
    public interface IWebsocketHandler
    {
        Task Handle(Guid id, WebSocket websocket);
        Task SendMessageToSockets(string message, int? roomId = null);
    }
}
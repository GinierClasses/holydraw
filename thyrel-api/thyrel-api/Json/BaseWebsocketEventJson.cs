using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public class BaseWebsocketEventJson
    {
        public WebsocketEvent WebsocketEvent { get; }

        public BaseWebsocketEventJson(WebsocketEvent websocketEvent)
        {
            WebsocketEvent = websocketEvent;
        }
    }
}
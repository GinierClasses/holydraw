using thyrel_api.Models;

namespace thyrel_api.Json
{
    public class BaseWebsocketEventJson
    {
        public WebsocketEvent WebsocketEvent { get; set; }

        public BaseWebsocketEventJson(WebsocketEvent websocketEvent)
        {
            WebsocketEvent = websocketEvent;
        }

        public BaseWebsocketEventJson()
        {
        }
    }
}
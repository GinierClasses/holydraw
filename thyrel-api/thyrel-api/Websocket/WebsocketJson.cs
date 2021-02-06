using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public abstract class RoomSocketJson
    {
        public string PlayerToken { get; set; }
    }

    public class EventJson
    {
        public WebsocketEvent WebsocketEvent { get; }

        public EventJson(WebsocketEvent websocketEvent)
        {
            WebsocketEvent = websocketEvent;
        }
    }
}
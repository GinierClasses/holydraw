using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public class RoomSocketJson
    {
        public RoomSocketJson(string playerToken)
        {
            PlayerToken = playerToken;
        }

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
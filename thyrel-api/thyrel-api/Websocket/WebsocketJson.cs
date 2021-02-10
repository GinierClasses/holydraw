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
        public EventJson(WebsocketEvent websocketEvent)
        {
            this.websocketEvent = websocketEvent;
        }

        public WebsocketEvent websocketEvent { get; }
    }
}
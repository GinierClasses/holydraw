using thyrel_api.Models;

namespace thyrel_api.Websocket
{
    public class ConnexionSocketMessage
    {
        public ConnexionSocketMessage(string playerToken)
        {
            PlayerToken = playerToken;
        }

        public string PlayerToken { get; set; }
    }

    public class BaseWebsocketEvent
    {
        public BaseWebsocketEvent(WebsocketEvent websocketEvent)
        {
            this.websocketEvent = websocketEvent;
        }

        public WebsocketEvent websocketEvent { get; }
    }

    public class PlayerWebsocketEvent : BaseWebsocketEvent
    {
        public Player player { get; }

        public PlayerWebsocketEvent(WebsocketEvent websocketEvent, Player player) : base(websocketEvent)
        {
            this.player = player;
        }
    }
}
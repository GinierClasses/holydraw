using Microsoft.AspNetCore.SignalR;

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
}
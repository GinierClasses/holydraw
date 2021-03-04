using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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

    public static class JSON
    {
        public static string Serialize(object obj)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };
            return JsonConvert.SerializeObject(obj,
                new JsonSerializerSettings
                {
                    ContractResolver = contractResolver,
                    Formatting = Formatting.Indented,
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }
    }
}
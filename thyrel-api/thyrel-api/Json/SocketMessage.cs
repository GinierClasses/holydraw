using thyrel_api.Models;

namespace thyrel_api.Json
{
    public class SocketMessageAuthentication : SocketMessageBase
    {
        public SocketMessageAuthentication(SendMessageType type, string playerToken) : base(type)
        {
            PlayerToken = playerToken;
        }

        public string PlayerToken { get; set; }
    }

    public class SocketMessageBase
    {
        public SocketMessageBase(SendMessageType type)
        {
            Type = type;
        }

        public SendMessageType Type { get; set; }
    }
}
using thyrel_api.Models;

namespace thyrel_api.Json
{
    public class SocketMessageAuthentication : SocketMessageBase
    {
        public string PlayerToken { get; set; }

        public SocketMessageAuthentication(SendMessageType type, string playerToken) : base(type)
        {
            PlayerToken = playerToken;
        }
    }

    public class SocketMessageBase
    {
        public SendMessageType Type { get; set; }

        public SocketMessageBase(SendMessageType type)
        {
            Type = type;
        }
    }
}
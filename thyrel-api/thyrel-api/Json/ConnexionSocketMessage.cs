namespace thyrel_api.Json
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
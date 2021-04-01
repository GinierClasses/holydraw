using System;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.Json
{
    public class PlayerIdWebsocketEventJson : BaseWebsocketEventJson
    {
        public int? PlayerId { get; }

        public PlayerIdWebsocketEventJson(WebsocketEvent websocketEvent, int? playerId) : base(websocketEvent)
        {
            PlayerId = playerId;
        }
    }
    
    public class ErrorWebsocketEventJson : BaseWebsocketEventJson
    {
        public string Error { get; }

        public ErrorWebsocketEventJson(string error)
        {
            WebsocketEvent = WebsocketEvent.Invalid;
            Error = error;
        }
    }

    public class PlayerWebsocketEventJson : BaseWebsocketEventJson
    {
        public PlayerDto Player { get; }

        public PlayerWebsocketEventJson(WebsocketEvent websocketEvent, PlayerDto player) : base(websocketEvent)
        {
            Player = player;
        }
        
        public PlayerWebsocketEventJson(WebsocketEvent websocketEvent, Player player) : base(websocketEvent)
        {
            Player = new PlayerDto(player);
        }
    }

    public class SessionWebsocketEventJson : BaseWebsocketEventJson
    {
        public SessionSocketDto Session { get; }

        public SessionWebsocketEventJson(WebsocketEvent websocketEvent, int step, SessionStepType stepType,
            DateTime? stepFinishAt, int timeDuration) : base(websocketEvent)
        {
            Session = new SessionSocketDto
            {
                ActualStep = step,
                StepFinishAt = stepFinishAt,
                TimeDuration = timeDuration,
                StepType = stepType
            };
        }
    }
}
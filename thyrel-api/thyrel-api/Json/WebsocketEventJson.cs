using System;
using thyrel_api.Models;

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

    public class PlayerWebsocketEventJson : BaseWebsocketEventJson
    {
        public Player Player { get; }

        public PlayerWebsocketEventJson(WebsocketEvent websocketEvent, Player player) : base(websocketEvent)
        {
            Player = player;
        }
    }
    
    public class SessionWebsocketEventJson : BaseWebsocketEventJson
    {
        public int Step { get; }
        public SessionStepType StepType { get; }
        public DateTime? StepFinishAt { get; }
        public int TimeDuration { get; }
        
        public SessionWebsocketEventJson(WebsocketEvent websocketEvent, int step, SessionStepType stepType, DateTime? stepFinishAt, int timeDuration) : base(websocketEvent)
        {
            Step = step;
            StepType = stepType;
            StepFinishAt = stepFinishAt;
            TimeDuration = timeDuration;
        }
    }
}
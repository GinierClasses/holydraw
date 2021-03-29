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
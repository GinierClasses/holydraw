using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using thyrel_api.Handler;
using thyrel_api.Json;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;

namespace thyrel_api.Models
{
    public class Session
    {
        public Session()
        {
        }

        public Session(int roomId, DateTime stepFinishAt, int timeDuration, SessionStepType stepType, int totalPlayers,
            RoomSettingsDto roomSettings)
        {
            CreatedAt = DateTime.Now;
            RoomId = roomId;
            ActualStep = 1;
            StepFinishAt = stepFinishAt;
            TimeDuration = timeDuration;
            StepType = stepType;
            TotalPlayers = totalPlayers;
            if (roomSettings.Mode != null)
                Mode = (RoomMode) roomSettings.Mode;
        }

        public int Id { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime? StepFinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TimeDuration { get; set; }
        public int ActualStep { get; set; }
        public SessionStepType StepType { get; set; }
        public int TotalPlayers { get; set; }

        public int? AlbumInitiatorId { get; set; }

        public RoomMode Mode { get; set; }

        public BookState BookState { get; set; }

        public int RoomId { get; set; }
        public virtual Room Room { get; set; }

        public virtual List<Element> Elements { get; set; }

        public void UpdateTimeForStep(int time)
        {
            if (time == 0) return;
            StepFinishAt = DateTime.Now.AddSeconds(time);
            TimeDuration = time;
        }

        public async Task RunNewTimeout(HolyDrawDbContext context, IWebsocketHandler websocketHandler)
        {
            if (StepType != SessionStepType.Book)
                new SessionStepTimeout(ActualStep, Id, context, websocketHandler).RunTimeout(
                    TimeDuration);
            await websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new SessionWebsocketEventJson(WebsocketEvent.SessionUpdate, ActualStep,
                        StepType, StepFinishAt, TimeDuration, 0, BookState)), RoomId);
        }
    }
}
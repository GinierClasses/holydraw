using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyrel_api.Models.DTO
{
    public class SessionDto
    {
        public SessionDto(Session session)
        {
            Id = session.Id;
            FinishAt = session.FinishAt;
            StepFinishAt = session.StepFinishAt;
            CreatedAt = session.CreatedAt;
            TimeDuration = session.TimeDuration;
            ActualStep = session.ActualStep;
            StepType = session.StepType;
            RoomId = session.RoomId;
            TotalPlayers = session.TotalPlayers;
        }

        public SessionDto()
        {
        }

        public int Id { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime? StepFinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TimeDuration { get; set; }
        public int ActualStep { get; set; }
        public SessionStepType StepType { get; set; }
        public int RoomId { get; set; }
        public int TotalPlayers { get; set; }

    }
}

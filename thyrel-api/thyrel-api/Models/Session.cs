using System;
using System.Collections.Generic;

namespace thyrel_api.Models
{
    public class Session
    {
        public Session()
        {
        }

        public Session(DateTime? finishAt, int roomId)
        {
            FinishAt = finishAt;
            CreatedAt = DateTime.Now;
            RoomId = roomId;
        }

        public int Id { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime? StepFinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ActualStep { get; set; }

        public int RoomId { get; set; }
        public virtual Room Room { get; set; }

        public virtual List<Element> Elements { get; set; }
    }
}
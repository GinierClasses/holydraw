using System;

namespace thyrel_api.Models
{
    public class Session
    {
        public Session() { }

        public Session(int? id, DateTime? finishAt, DateTime createdAt, int roomId, Room room)
        {
            Id = id;
            FinishAt = finishAt;
            CreatedAt = createdAt;
            RoomId = roomId;
            Room = room;
        }

        public int? Id { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public int RoomId { get; set; }
        public virtual Room Room { get; set; }
    }
}
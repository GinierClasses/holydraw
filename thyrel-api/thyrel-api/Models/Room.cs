using System;
using System.Collections.Generic;

namespace thyrel_api.Models
{
    public class Room
    {
        public Room()
        {
        }

        public Room(string identifier)
        {
            Identifier = identifier;
            CreatedAt = DateTime.Now;
            Mode = RoomMode.Standard;
        }

        public int Id { get; set; }
        public RoomMode Mode { get; set; }
        public string Identifier { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual List<Session> Sessions { get; set; }
        public virtual List<Player> Players { get; set; }
    }
}
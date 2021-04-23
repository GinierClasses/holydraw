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
        }

        public int Id { get; set; }
        public string Identifier { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual List<Session> Sessions { get; set; }
        public virtual List<Player> Players { get; set; }
    }
}
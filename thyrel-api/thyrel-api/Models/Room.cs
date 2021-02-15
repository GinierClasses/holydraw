using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Room
    {
        public Room() { }

        public Room(int? id, string identifier, DateTime? finishAt)
        {
            Id = id;
            Identifier = identifier;
            FinishAt = finishAt;
            CreatedAt = DateTime.Now;
        }

        public int? Id { get; set; }
        public string Identifier { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual List<Session> Sessions { get; set; }
        public virtual List<Player> Players { get; set; }
    }
}

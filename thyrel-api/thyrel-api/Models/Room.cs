using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Room
    {
        public Room() { }

        public Room(int id, string identifier, DateTime? finishAt, DateTime createdAt)
        {
            Id = id;
            Identifier = identifier;
            FinishAt = finishAt;
            CreatedAt = createdAt;
        }

        public int Id { get; set; }
        public string Identifier { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<Session> Sessions { get; set; }
        public List<Player> Players { get; set; }
    }
}

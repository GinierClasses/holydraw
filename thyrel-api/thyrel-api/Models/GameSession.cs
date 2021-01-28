using System;

namespace thyrel_api.Models
{
    public class GameSession
    {
        public int Id { get; set; }//Entity framework automatically identify ID as primary key
        public string Identifier { get; set; }
        public DateTime FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public GameSession() { }
    }
}
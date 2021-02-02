using System;

namespace thyrel_api.Models
{
    public class Session
    {
        public Session() { }

        public int Id { get; set; }
        public string Identifier { get; set; }
        public DateTime FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
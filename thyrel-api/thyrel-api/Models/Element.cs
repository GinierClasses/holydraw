using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Drawing
    {
        public Drawing() { }

        public Drawing(int? id, int step, DateTime createdAt, int creatorId, int initiatorId, int sessionId)
        {
            Id = id;
            Step = step;
            CreatedAt = createdAt;
            CreatorId = creatorId;
            InitiatorId = initiatorId;
            SessionId = sessionId;
        }

        //TODO public string ImagePath { get; set; }
        public int? Id { get; set; }
        public int Step { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public int CreatorId { get; set; }
        public virtual Player Creator { get; set; }

        public int InitiatorId { get; set; }
        public virtual Player Initiator { get; set; }

        public int SessionId { get; set; }
        public virtual Session Session { get; set; }
    }
}

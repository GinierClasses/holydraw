using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Sentence
    {
        public Sentence() { }

        public Sentence(int? id, string text, int step, DateTime createdAt, int creatorId, int initiatorId, int sessionId)
        {
            Id = id;
            Text = text;
            Step = step;
            CreatedAt = createdAt;
            CreatorId = creatorId;
            InitiatorId = initiatorId;
            SessionId = sessionId;
        }

        public int? Id { get; set; }
        public string Text { get; set; }
        public int Step { get; set; }
        public DateTime CreatedAt { get; set; }

        public int CreatorId { get; set; }
        [ForeignKey("CreatorId")]
        public virtual Player Creator { get; set; }

        public int InitiatorId { get; set; }
        [ForeignKey("InitiatorId")]
        public virtual Player Initiator { get; set; }

        public int SessionId { get; set; }
        public virtual Session Session { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Element
    {
        public Element() { }

        public Element(int? id, int step, ElementType type, string text, int? drawingId, DateTime? finishAt, DateTime createdAt, int creatorId, int initiatorId, int sessionId)
        {
            Id = id;
            Step = step;
            Type = type;
            Text = text;
            DrawingId = drawingId;
            FinishAt = finishAt;
            CreatedAt = createdAt;
            CreatorId = creatorId;
            InitiatorId = initiatorId;
            SessionId = sessionId;
        }

        public int? Id { get; set; }
        public int Step { get; set; }
        public ElementType Type { get; set; }
        public string? Text { get; set; }
        public int? DrawingId { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }


        public int CreatorId { get; set; }
        public virtual Player Creator { get; set; }

        public int InitiatorId { get; set; }
        public virtual Player Initiator { get; set; }

        public int SessionId { get; set; }
        public virtual Session Session { get; set; }
    }
}

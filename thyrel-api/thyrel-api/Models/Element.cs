using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Element
    {
        public Element() { }

        public Element(int? id, int step, int creatorId, int initiatorId, int sessionId,  int? drawingId = null)
        {
            Id = id;
            Step = step;
            Type = ElementType.Drawing;
            DrawingId = drawingId;
            CreatedAt = DateTime.Now;
            CreatorId = creatorId;
            InitiatorId = initiatorId;
            SessionId = sessionId;
        }
        
        public Element(int? id, int step,  int creatorId, int initiatorId, int sessionId, string text = null)
        {
            Id = id;
            Step = step;
            Type = ElementType.Sentence;
            Text = text;
            CreatorId = creatorId;
            InitiatorId = initiatorId;
            SessionId = sessionId;
            CreatedAt = DateTime.Now;
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

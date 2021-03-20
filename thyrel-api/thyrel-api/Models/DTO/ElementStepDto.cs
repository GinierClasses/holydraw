using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyrel_api.Models.DTO
{
    public class ElementStepDto
    {
        public ElementStepDto(ElementDto element, ElementDto parent)
        {
            Id = element.Id;
            Step = element.Step;
            Type = element.Type;
            Text = element.Text;
            DrawingId = element.DrawingId;
            FinishAt = element.FinishAt;
            CreatedAt = element.CreatedAt;
            SessionId = element.SessionId;
            if (parent != null)
            {
                Parent = parent;
            }
        }
        public int Id { get; set; }
        public int Step { get; set; }
        public ElementType Type { get; set; }
        public string Text { get; set; }
        public int? DrawingId { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int SessionId { get; set; }
        public ElementDto Parent{get; set;}
    }
}

using System;

namespace thyrel_api.Models.DTO
{
    public class ElementDto
    {
        public int Id { get; set; }
        public int Step { get; set; }
        public ElementType Type { get; set; }
        public string Text { get; set; }
        public int? DrawingId { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int SessionId { get; set; }
    }
}
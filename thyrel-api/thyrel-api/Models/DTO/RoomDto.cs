using System;

namespace thyrel_api.Models.DTO
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Identifier { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public RoomMode Mode { get; set; }
    }

    public class RoomReloadIdentifierDto
    {
        public int Id { get; set; }
        public string Identifier { get; set; }
    }

    public class RoomSettingsDto
    {
        public RoomMode Mode;
    }
}
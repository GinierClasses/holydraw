using System;

namespace thyrel_api.Models.DTO
{
    public class PlayerDto
    {
        public PlayerDto()
        {
        }

        public PlayerDto(Player player)
        {
            Id = player.Id;
            Username = player.Username;
            AvatarUrl = player.AvatarUrl;
            IsOwner = player.IsOwner;
            IsPlaying = player.IsPlaying;
            IsConnected = player.IsConnected;
            DisableAt = player.DisableAt;
            CreatedAt = player.CreatedAt;
            RoomId = player.RoomId;
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public bool IsOwner { get; set; }
        public bool IsPlaying { get; set; }
        public bool IsConnected { get; set; }
        public DateTime? DisableAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? RoomId { get; set; }
    }
}
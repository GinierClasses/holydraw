using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Player
    {
        public Player() { }

        public Player(int? id, string username, string avatarUrl, bool isOwner, DateTime? disableAt, DateTime createdAt, int roomId)
        {
            Id = id;
            Username = username;
            AvatarUrl = avatarUrl;
            IsOwner = isOwner;
            DisableAt = disableAt;
            CreatedAt = createdAt;
            RoomId = roomId;
        }

        public int? Id { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public bool IsOwner { get; set; }
        public DateTime? DisableAt { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public int RoomId { get; set; }
        public virtual Room Room { get; set; }

        public List<Token> Tokens { get; set; }
    }
}

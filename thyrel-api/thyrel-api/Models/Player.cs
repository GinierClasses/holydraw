using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Player
    {
        public Player() { }

        public int Id { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public bool IsOwner { get; set; }
        public DateTime DisableAt { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public int SessionId { get; set; }
        public virtual Session Session { get; set; }

        public List<Token> Tokens { get; set; }
    }
}

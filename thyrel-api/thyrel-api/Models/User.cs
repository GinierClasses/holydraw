using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public bool IsOwner { get; set; }
        public DateTime DisableAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int GamesessionID { get; set; }//Entity Framework interprete "navProp"+"ID" as a foreignkey

        [ForeignKey("GamesessionID")]         //du coups je crois que ceci est une indication redondante
        public virtual GameSession GameSession { get; set; }

        public User() { }
    }
}

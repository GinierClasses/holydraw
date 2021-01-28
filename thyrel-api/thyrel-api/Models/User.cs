using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public bool IsOwner { get; set; }
        public DateTime DisableAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int GamesessionID { get; set; }//Entity Framework interprete "navProp"+"ID" as a foreignkey

        [ForeignKey("GamesessionID")]
        public virtual GameSession GameSession { get; set; }
    }
}

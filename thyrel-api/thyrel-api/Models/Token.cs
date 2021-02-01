using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Token
    {
        public int Id { get; set; }
        public string TokenText { get; set; }
        public DateTime DiscardAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public Token() { }
    }
}

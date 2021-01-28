using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Token
    {
        public int ID { get; set; }
        public string TokenText { get; set; }
        public DateTime DiscardAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}

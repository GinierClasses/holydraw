using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Sentence
    {
        public Sentence() { }

        public int Id { get; set; }
        public string Text { get; set; }
        public int Step { get; set; }

        public int OwnerUserId { get; set; }
        public virtual Player OwnerPlayer { get; set; }

        public int CreatorUserId { get; set; }
        public virtual Player CreatorPlayer { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Sentence
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int Step { get; set; }
        public int OwnerUserId { get; set; }
        public int CreatorUserId { get; set; }

        [ForeignKey("OwnerUserId")]
        public virtual User OwnerUser { get; set; }

        [ForeignKey("CreatorUserId")]
        public virtual User CreatorUser { get; set; }

        public Sentence() { }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Sentence
    {
        public int ID { get; set; }
        public string Text { get; set; }
        public int Step { get; set; }
        public int OwnerUserID { get; set; }
        public int CreatorUserID { get; set; }

        [ForeignKey("OwnerUserID")]
        public virtual User OwnerUser { get; set; }

        [ForeignKey("CreatorUserID")]
        public virtual User CreatorUser { get; set; }

        public Sentence() { }
    }
}

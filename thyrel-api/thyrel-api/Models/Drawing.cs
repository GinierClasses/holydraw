using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Drawing
    {
        public int Id { get; set; }
        //TODO public string ImagePath { get; set; }
        public int Step { get; set; }
        public int OwnerUserId { get; set; }
        public int CreatorUserId { get; set; }

        [ForeignKey("OwnerUserId")]
        public virtual User OwnerUser { get; set; }

        [ForeignKey("CreatorUserId")]
        public virtual User CreatorUser { get; set; }

        public Drawing()
        {
        }
    }
}

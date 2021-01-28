using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Drawing
    {
        public int Id { get; set; }
        //TODO public string ImagePath { get; set; }
        public int Step { get; set; }
        public int OwnerUserID { get; set; }
        public int CreatorUserID { get; set; }

        [ForeignKey("OwnerUserID")]
        public virtual User OwnerUser { get; set; }

        [ForeignKey("CreatorUserID")]
        public virtual User CreatorUser { get; set; }

        public Drawing()
        {
        }
    }
}

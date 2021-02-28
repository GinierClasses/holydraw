using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyrel_api.Models
{
    public class Publisher
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}

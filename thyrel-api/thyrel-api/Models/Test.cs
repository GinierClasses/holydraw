using System;
namespace thyrel_api.Models
{
    public class Test
    {
        public Test()
        {
        }

        public Test(int? id, string name)
        {
            ID = id;
            Name = name;
        }

        public int? ID { get; set; }//Entity framework automatically identify ID as primary key
        public string Name { get; set; }
    }
}

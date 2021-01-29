using System;
namespace thyrel_api.Models
{
    public class Test
    {
        public Test(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }//Entity framework automatically identify ID as primary key
        public string Name { get; set; }
    }
}

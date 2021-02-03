using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Models;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public TestController()
        {
        }
        // GET: api/Test
        [HttpGet]
        public IEnumerable<string> Get()
        {
            using (var context = new HolyDrawDbContext())
            {
                var rooms = context.Room.ToList();
                context.Room.Add(new Room(null, "ID:LOLMDRDULOL:45", null, DateTime.Now));
                context.SaveChanges();
                var rooms2 = context.Room.ToList();
            }

            yield return "API is happy to see you";
        }

        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            return new[] { "Here is you're value", value };
        }
    }
}

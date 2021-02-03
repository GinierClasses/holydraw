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
                var tokens = context.Token.ToList();
                context.Token.Add(new Token(null, "blabla", 1));
                context.SaveChanges();
                var tokens2 = context.Token.ToList();
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

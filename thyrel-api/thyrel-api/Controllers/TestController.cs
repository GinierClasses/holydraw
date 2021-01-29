using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Models;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private TestContext _context;
        public TestController(TestContext context)
        {
            _context = context;
        }
        // GET: api/Test
        [HttpGet]
        public IEnumerable<string> Get()
        {
            yield return "API is happy to see you";
        }

        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            _context.TestItems.Add(new Test(2, "jean miche pute"));
            _context.SaveChanges();
            return new String[] { "Here is you're value", value };
        }
    }
}

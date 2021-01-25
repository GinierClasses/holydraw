using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
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
            return new String[] { "Here is you're value", value };
        }
    }
}

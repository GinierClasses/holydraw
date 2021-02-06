using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers.ModelsControllers;
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
        public async Task<ActionResult<Room>> Get()
        {
            var tc = new RoomController();
            return tc.GetRoom(1);
        }

        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            return new[] { "Here is you're value", value };
        }
    }
}

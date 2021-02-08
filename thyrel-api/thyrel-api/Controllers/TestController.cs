using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers.ModelsControllers;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;

        public TestController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
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
            var isInt = int.TryParse(value, out var intValue);
            _websocketHandler.SendMessageToSockets("YOYO here", isInt ? intValue : null);
            return new[] { "Here is you're value", value};
        }
    }
}

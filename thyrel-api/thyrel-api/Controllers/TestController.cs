using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;
        private HolyDrawDbContext _context;

        public TestController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        // GET: api/Test
        [HttpGet]
        public async Task<ActionResult<Player>> Get()
        {
            var c = new PlayerDataProvider(_context);
            return await c.GetPlayer(27);
        }

        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            var isInt = int.TryParse(value, out var intValue);
            _websocketHandler.SendMessageToSockets("Yo yo here", isInt ? intValue : null);
            return new[] {"Here is you're value", value};
        }
    }
}
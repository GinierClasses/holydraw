using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Websocket;
using thyrel_api.Controllers;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<Element>> Get()
        {
            var c = new ElementDataProvider(_context);
            await c.SetSentence(1, "false mon petite didier");
            return await c.GetElement(1);
        }

        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            var isInt = int.TryParse(value, out var intValue);
            _websocketHandler.SendMessageToSockets("YOYO here", isInt ? intValue : null);
            return new[] {"Here is you're value", value};
        }
    }
}
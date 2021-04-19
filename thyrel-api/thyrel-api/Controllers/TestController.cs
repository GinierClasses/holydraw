using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IWebsocketHandler _websocketHandler;
        private readonly HolyDrawDbContext _context;

        public TestController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        // GET: api/Test
        [HttpGet]
        public async Task<ActionResult<List<ElementCandidateDto>>> Get()
        {
            var elements = await new ElementDataProvider(_context).GetNextCandidateElements(33);
            // var element = await _context.Element.OrderBy(e => e.CreatedAt).LastAsync();
            return elements;
        }


        // for test the album
        // GET: api/get_own_album
        [HttpGet("/api/get_own_album")]
        public async Task<ActionResult<List<Element>>> GetOwnAlbum()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            var elements = _context.Element
                .Where(e => e.InitiatorId == player.Id)
                .Include(e => e.Creator)
                .ToList();
            // var element = await _context.Element.OrderBy(e => e.CreatedAt).LastAsync();
            return elements;
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
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Json;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ElementController : ControllerBase
    {
        private readonly IWebsocketHandler _websocketHandler;
        private readonly HolyDrawDbContext _context;

        public ElementController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }


        // Call this endpoint to update the element with the finished result from the player
        // PATCH: api/element/:id
        [HttpPatch("{id}")]
        public async Task<ActionResult<Element>> Finish(int id, [FromBody] ElementBody body)
        {
            var elementDataProvider = new ElementDataProvider(_context);
            var element = await elementDataProvider.GetElement(id);
            var session = await new SessionDataProvider(_context).GetSessionById(element.SessionId);
            await elementDataProvider.HandleFinish(id, true);

            if (element.Type == ElementType.Sentence)
            {
                await elementDataProvider.SetSentence(id, body.Text);
            }
            else
            {
                await elementDataProvider.SetDrawing(id, body.DrawingId ?? 0);
            }

            await _websocketHandler.SendMessageToSockets(
                JSON.Serialize(
                    new BaseWebsocketEventJson(WebsocketEvent.PlayerFinished)), session.RoomId);

            return Ok(element);
        }

        // Call this endpoint to get a room
        // GET : api/element/4
        [HttpGet("{id}")]
        public async Task<ActionResult<Element>> GetElement(int id)
        {
            var element = await new ElementDataProvider(_context).GetElement(id);
            return element;
        }
        
        // Call this endpoint to get a room
        // GET : api/element/current
        [HttpGet("current")]
        public async Task<ActionResult<ElementDto>> GetCurrentElement()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            return await new ElementDataProvider(_context).GetCurrentElement(player.Id);
        }


        public class ElementBody
        {
            public string Text;
            public int? DrawingId;
        }
    }
}
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Websocket;

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
                JsonSerializer.Serialize(
                    new BaseWebsocketEvent(WebsocketEvent.PlayerFinished)), session.RoomId);

            return Ok();
        }

        // Call this endpoint to get a room
        // GET : api/room/identifier
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Element>> GetElement(int id)
        {
            var element = await new ElementDataProvider(_context).GetElement(id);
            return element;
        }

        public class ElementBody
        {
            public string Text;
            public int? DrawingId;
        }
    }
}

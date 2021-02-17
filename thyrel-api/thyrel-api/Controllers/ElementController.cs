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
        private IWebsocketHandler _websocketHandler;

        public ElementController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }


        // Call this endpoint to update the element with the finished result from the player
        // PATCH: api/element/:id
        [HttpPatch("{id}")]
        public async Task<ActionResult<Element>> Finish(int id, [FromBody] ElementBody body)
        {
            var element = await new ElementDataProvider().GetElement(id);
            var session = await new SessionDataProvider().GetSessionById(element.SessionId);
            await new ElementDataProvider().HandleFinish(id, true);

            if (element.Type == ElementType.Sentence)
            {
                await new ElementDataProvider().SetSentence(id, body.Text);
            }
            else
            {
                await new ElementDataProvider().SetDrawing(id, body.DrawingId ?? 0);
            }

            await _websocketHandler.SendMessageToSockets(
                JsonSerializer.Serialize(
                    new EventJson(WebsocketEvent.PlayerFinished)), session.RoomId);

            return Ok();
        }

        // Call this endpoint to get a room
        // GET : api/room/identifier
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Element>> GetElement(int id)
        {
            var element = await new ElementDataProvider().GetElement(id);
            return element;
        }

        public class ElementBody
        {
            public string Text;
            public int? DrawingId;
        }
    }
}

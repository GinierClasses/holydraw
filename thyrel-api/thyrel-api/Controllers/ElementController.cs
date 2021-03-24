using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Json;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
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
            var sessionDataProvider = new SessionDataProvider(_context);
            var element = await elementDataProvider.GetElement(id);
            var session = await sessionDataProvider.GetSessionById(element.SessionId);
            
            var finishState = await elementDataProvider.HandleFinish(id);
            if (finishState.FinishAt != null)
                if (element.Type == ElementType.Sentence)
                    await elementDataProvider.SetSentence(element, body.Text);
                else
                    await elementDataProvider.SetDrawing(element, body.DrawImage);
            
            var stepState = await sessionDataProvider.GetPlayerStatus(element.Session);
            if (stepState.PlayerCount == stepState.PlayerFinished)
                await sessionDataProvider.NextStep(session);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
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
        public async Task<ActionResult<ElementDto>> GetCurrent()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            return await new ElementDataProvider(_context).GetCurrentElement(player.Id);
        }


        public class ElementBody
        {
            public string Text;
            public string DrawImage;
        }
    }
}
using System;
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
        public async Task<ActionResult<Element>> Finish(int id, [FromBody] FinishElementDto body)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized("You're not in the room.");

            var elementDataProvider = new ElementDataProvider(_context);
            var sessionDataProvider = new SessionDataProvider(_context);

            var elementDto = await elementDataProvider.GetElement(id);
            if (elementDto.CreatorId != player.Id) return Unauthorized("You're not the creator of this element.");

            var session = await sessionDataProvider.GetSessionById(elementDto.SessionId);
            if (elementDto.Step != session.ActualStep) return Unauthorized("You can't modify a previous element.");
            
            var remainingStepTime = session.StepFinishAt == null
                ? new TimeSpan()
                : (TimeSpan) (session.StepFinishAt - DateTime.Now);

            if (session.ActualStep != elementDto.Step) return BadRequest("You are trying to modify a previous element.");

            var element = await elementDataProvider.HandleFinish(id, body);

            var stepState = await sessionDataProvider.GetPlayerStatus(session);
            if (stepState.PlayerCount == stepState.PlayerFinished && remainingStepTime.TotalMilliseconds > 5000)
            {
                session = await sessionDataProvider.NextStep(session);
                await session.RunNewTimeout(_context, _websocketHandler);
            }
            else
                await _websocketHandler.SendMessageToSockets(
                    JsonBase.Serialize(
                        new PlayerFinishStepWebsocketEventJson(WebsocketEvent.SessionUpdate, stepState.PlayerFinished)),
                    session.RoomId);

            return Ok(element);
        }

        // Automaticly call this endpoint to handle finish state
        // PATCH: api/element/:id
        [HttpPatch("auto/{id}")]
        public async Task<ActionResult<Element>> AutoFinish(int id, [FromBody] FinishElementDto body)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized("You're not in the room.");

            var elementDataProvider = new ElementDataProvider(_context);
            var sessionDataProvider = new SessionDataProvider(_context);

            var element = await elementDataProvider.GetElement(id);
            if (element.CreatorId != player.Id) return Unauthorized("You're not the creator of this element.");

            var session = await sessionDataProvider.GetSessionById(element.SessionId);
            if (element.Step != session.ActualStep) return Unauthorized("You can't modify a previous element.");

            if (element.Type == ElementType.Sentence)
            {
                await elementDataProvider.SetSentence(element.Id, body.Text);
            }
            else
            {
                await elementDataProvider.SetDrawing(element.Id, body.DrawImage);
            }

            return Ok();
        }

        // Call this endpoint to get an Element by Id
        // GET : api/element/4
        [HttpGet("{id}")]
        public async Task<ActionResult<ElementDto>> GetElement(int id)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            var element = await new ElementDataProvider(_context).GetElement(id);
            if (element.CreatorId != player.Id) return Unauthorized();
            return element;
        }

        // Call this endpoint to get the current Element of the player that call the api
        // GET : api/element/current
        [HttpGet("current")]
        public async Task<ActionResult<ElementStepDto>> GetCurrent()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            return await new ElementDataProvider(_context).GetCurrentElement(player.Id);
        }
    }
}

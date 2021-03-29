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
        public async Task<ActionResult<Element>> Finish(int id, [FromBody] ElementBody body)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            var elementDataProvider = new ElementDataProvider(_context);
            var sessionDataProvider = new SessionDataProvider(_context);

            var element = await elementDataProvider.GetElement(id);
            if (element.CreatorId != player.Id) return Unauthorized();

            var session = await sessionDataProvider.GetSessionById(element.SessionId);
            var remainingStepTime = session.StepFinishAt == null
                ? new TimeSpan()
                : (TimeSpan) (session.StepFinishAt - DateTime.Now);

            // handle finish state of session
            var finishState = await elementDataProvider.HandleFinish(id);
            // edit element only if session is now not null
            if (finishState.FinishAt != null)
                if (finishState.Type == ElementType.Sentence)
                { 
                    await elementDataProvider.SetSentence(finishState.Id, body.Text);
                    finishState.Text = body.Text;
                }
                else
                {
                    await elementDataProvider.SetDrawing(element.Id, body.DrawImage);
                    finishState.DrawImage = body.DrawImage;
                }

            var stepState = await sessionDataProvider.GetPlayerStatus(session);
            if (stepState.PlayerCount == stepState.PlayerFinished && remainingStepTime.TotalMilliseconds > 5000)
                await sessionDataProvider.NextStep(session);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new SessionSocketDto()
                    {
                        PlayerFinished = stepState.PlayerFinished
                    }), session.RoomId);

            return Ok(finishState);
        }

        // Call this endpoint to get an Element by Id
        // GET : api/element/4
        [HttpGet("{id}")]
        public async Task<ActionResult<ElementDto>> GetElement(int id)
        {
            var element = await new ElementDataProvider(_context).GetElement(id);
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


        public class ElementBody
        {
            public string Text;
            public string DrawImage;
        }
    }
}
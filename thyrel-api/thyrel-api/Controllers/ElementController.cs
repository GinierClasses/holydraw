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

            if (session.ActualStep != elementDto.Step)
                return BadRequest("You are trying to modify a previous element.");

            var element = await elementDataProvider.HandleFinish(id, body);

            // special syntax to run task after answer
            try
            {
                return Ok(element);
            }
            finally
            {
                Response.OnCompleted(async () =>
                {
                    // don't await this call to avoid bug and quickly send answer
                    var stepState = await sessionDataProvider.GetPlayerStatus(session);
                    if (stepState.PlayerCount == stepState.PlayerFinished &&
                        (remainingStepTime.TotalMilliseconds > 5000 || remainingStepTime.TotalMilliseconds < -2000))
                    {
                        session = await sessionDataProvider.NextStep(session);
                        await session.RunNewTimeout(_context, _websocketHandler);
                    }
                    else
                        await _websocketHandler.SendMessageToSockets(
                            JsonBase.Serialize(
                                new PlayerFinishStepWebsocketEventJson(WebsocketEvent.SessionUpdate,
                                    stepState.PlayerFinished)),
                            session.RoomId);
                });
            }
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
            if (element.Step != session.ActualStep && element.Step != session.ActualStep + 1 ||
                session.StepType == SessionStepType.Book)
                return Unauthorized("You can't modify a previous element.");

            if (element.Type == ElementType.Sentence)
            {
                await elementDataProvider.SetSentence(element.Id, body.Text);
            }
            else
            {
                await elementDataProvider.SetDrawing(element.Id, body.DrawImage);
            }

            return NoContent();
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

        /// <summary>
        /// call this endpoint to add a new emojiReaction to an element
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="emojiReaction"></param>
        /// <returns></returns>
        [HttpPost("{elementId}/reaction")]
        public async Task<ActionResult> AddReaction(int elementId, [FromBody] EmojiReaction emojiReaction)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null && await isElementInLastSession(elementId, (int)player.RoomId)) return Unauthorized();

            var reaction = await  new ReactionDataProvider(_context).AddReaction(player.Id, elementId, emojiReaction);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new EmojiReactionWebSocketEventJson(player.Id, elementId, reaction.Emoji)), player.RoomId);

            return NoContent();
        }

        /// <summary>
        /// call this endpoint to delete a player Reaction to an element by reaction Id
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{elementId}/reaction/{id}")]
        public async Task<ActionResult> DeleteReaction(int elementId, int id)
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null && await isElementInLastSession(elementId, (int)player.RoomId)) return Unauthorized();

            await _reactionDataProvider.RemoveReaction(id);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new RemovedEmojiReactionWebSocketEventJson(player.Id, elementId)), player.RoomId);

            return Ok(200);
        }

        /// <summary>
        /// method to check if the element is in the last session
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task<bool> isElementInLastSession(int elementId, int roomId)
        {
            var session = await new SessionDataProvider(_context).GetCurrentSessionByRoomId(roomId);            
            var element = await new ElementDataProvider(_context).GetElement(elementId);
            return session.Id == element.SessionId;
        }
    }
}

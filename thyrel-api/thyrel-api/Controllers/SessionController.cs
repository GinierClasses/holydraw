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
    public class SessionController : ControllerBase
    {
        private readonly IWebsocketHandler _websocketHandler;
        private readonly HolyDrawDbContext _context;

        public SessionController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        // Call this endpoint to create a Session
        // POST: api/session
        [HttpPost]
        public async Task<ActionResult<SessionDto>> Start()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null || !player.IsOwner) return Unauthorized();

            var roomId = (int) player.RoomId;

            var sessionDataProvider = new SessionDataProvider(_context);
            var session = await sessionDataProvider.StartSession(roomId);
            if (session == null)
                return NotFound();

            new SessionStepTimeout(session.ActualStep, session.Id, _context, _websocketHandler)
                .RunTimeout(session.TimeDuration);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new BaseWebsocketEventJson(WebsocketEvent.SessionStart)), roomId);

            var sessionDto = new SessionDto(session);
            return sessionDto;
        }

        // Get the current session
        // GET: api/session/current
        [HttpGet("current")]
        public async Task<ActionResult<SessionDto>> GetCurrent()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            return await new SessionDataProvider(_context).GetCurrentSessionByRoomId((int) player.RoomId);
        }

        // Post for a next album
        // GET: api/session/album/next
        [HttpPost("album/next")]
        public async Task<ActionResult> NextAlbum()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null || !player.IsOwner) return Unauthorized();

            var sessionDataProvider = new SessionDataProvider(_context);
            var session = await sessionDataProvider.NextAlbum((int) player.RoomId);

            if (session?.CurrentAlbumId == null) return BadRequest();

            new AlbumStepTimeout((int) session.CurrentAlbumId, session.Id, _context, 1, _websocketHandler)
                .RunTimeout(3);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new SessionCurrentAlbumIdUpdateEventJson(session.CurrentAlbumId)), 
                session.RoomId);

            return Ok("success");
        }
    }
}
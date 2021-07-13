using System.Collections.Generic;
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
        private readonly HolyDrawDbContext _context;
        private readonly IWebsocketHandler _websocketHandler;

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

        // Call this endpoint to get players of a room
        // GET : api/session/players
        [HttpGet("players")]
        public async Task<ActionResult<List<PlayerDto>>> GetPlayersByRoom()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            var players = await new SessionDataProvider(_context).GetCurrentPlayersInSession((int) player.RoomId);
            return players;
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

            if (session?.AlbumInitiatorId == null) return BadRequest();

            new AlbumStepTimeout((int) session.AlbumInitiatorId, session.Id, _context, 1, _websocketHandler)
                .RunTimeout(3);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new SessionAlbumEventJson(session.AlbumInitiatorId, session.BookState)),
                session.RoomId);

            return Ok("success");
        }

        [HttpGet("album/recovery")]
        public async Task<ActionResult<List<ElementAlbumDto>>> AlbumRecovery()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();

            var sessionDataProvider = new SessionDataProvider(_context);
            return await sessionDataProvider.AlbumRecovery((int) player.RoomId);
        }
    }
}
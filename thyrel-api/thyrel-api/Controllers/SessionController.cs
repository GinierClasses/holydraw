using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Json;
using thyrel_api.Models;
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
        public async Task<ActionResult<Session>> Start()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null || !player.IsOwner) return Unauthorized();

            var roomId = (int) player.RoomId;
            
            var sessionDataProvider = new SessionDataProvider(_context);
            var session = await sessionDataProvider.StartSession(roomId);
            if (session == null)
                return NotFound();
            
            await _websocketHandler.SendMessageToSockets(
                JSON.Serialize(
                    new BaseWebsocketEventJson(WebsocketEvent.SessionStart)), roomId);

            return session;
        }

        // Get the current session
        // GET: api/session/current
        [HttpGet("current")]
        public async Task<ActionResult<Session>> Get()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player?.RoomId == null) return Unauthorized();
            
            return await new SessionDataProvider(_context).GetCurrentSessionByRoomId((int) player.RoomId);
        }

    }
}
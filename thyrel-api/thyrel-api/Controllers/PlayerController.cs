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
    public class PlayerController : ControllerBase
    {
        private readonly HolyDrawDbContext _context;
        private readonly IWebsocketHandler _websocketHandler;

        public PlayerController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        // Call this endpoint to get own player
        // POST: api/players/me
        [HttpGet("me")]
        public async Task<ActionResult<Player>> Get()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null) return Unauthorized();
            return await new PlayerDataProvider(_context).GetPlayer(player.Id);
        }

        // Call this endpoint to kick the player from the room he is in
        // PATCH: api/players/12/kick
        [HttpPatch("players/{id}/kick")]
        public async Task<ActionResult<Player>> Kick(int id)
        {
            var playerKicker = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (playerKicker == null || !playerKicker.IsOwner) return Unauthorized();

            var playerDataProvider = new PlayerDataProvider(_context);
            var playerToKick = await playerDataProvider.GetPlayer(id);
            var roomId = playerToKick.RoomId;

            if (playerKicker.RoomId != roomId) return Unauthorized();

            var playerKicked = await playerDataProvider.KickPlayerFromRoom(playerToKick);

            await _websocketHandler.SendMessageToSockets(
                JsonBase.Serialize(
                    new PlayerIdWebsocketEventJson(WebsocketEvent.PlayerKicked, playerKicked.Id)), roomId);
            return playerKicked;
        }
    }
}
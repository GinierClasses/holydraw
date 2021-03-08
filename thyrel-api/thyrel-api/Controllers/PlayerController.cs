using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IWebsocketHandler _websocketHandler;
        private readonly HolyDrawDbContext _context;

        public PlayerController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        // Call this endpoint to get own player
        // POST: api/players/me
        [HttpGet("me")]
        public async Task<ActionResult<Player>> Post()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null) return Unauthorized();
            return await new PlayerDataProvider(_context).GetPlayer(player.Id);
        }

        //Call this enpoint to kick the player from the room he is in
        [HttpPatch("players/{id}/kick")]
        public async Task<ActionResult<Player>> Kick(int id)
        {
            var playerDataProvider = new PlayerDataProvider();

            var player = await playerDataProvider.KickPlayerFromRoomById(id);

            //TODO change BaseWebsocketEvent with WebsocketEventWithPlayerId
            await _websocketHandler.SendMessageToSockets(
                    JsonSerializer.Serialize(
                        new BaseWebsocketEvent(WebsocketEvent.PlayerKicked)), id);

            return player;
        }
}
}
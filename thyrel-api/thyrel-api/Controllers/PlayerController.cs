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
        private IWebsocketHandler _websocketHandler;
        public PlayerController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        // Call this endpoint to get own player
        // POST: api/players/me
        [HttpGet("me")]
        public async Task<ActionResult<Player>> Post()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext);
            if (player == null) return Unauthorized();
            return player;
        }

        //Call this enpoint to kick the player from the room he is in
        [HttpPatch("players/{id}/kick")]
        public async Task<ActionResult<Player>> Kick(int id)
        {
            var playerDataProvider = new PlayerDataProvider();

            var player = playerDataProvider.KickPlayerFromRoomById(id);

            await _websocketHandler.SendMessageToSockets(
                    JsonSerializer.Serialize(
                        new BaseWebsocketEvent(WebsocketEvent.PlayerKicked)), id);

            return await playerDataProvider.GetPlayer(player.Id);
        }
}
}
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;

        public RoomController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        public class PostBody
        {
            public string Username;
            public string AvatarUrl;
        }

        // Call this endpoint to create a room
        // POST: api/room
        [HttpPost]
        public ActionResult<Player> Post([FromBody] PostBody body)
        {
            if (body.Username == null || body.AvatarUrl == null)
                return NotFound(); // 404 : most of api error
            var roomController = new RoomDataProvider();
            var playerController = new PlayerDataProvider();
            var tokenController = new TokenDataProvider();

            var room = roomController.Add();
            var token = tokenController.Add();
            var player = playerController.Add(body.Username, body.AvatarUrl, true, room.Id ?? 1, token.Id ?? 1);
            // use `GetPlayer` to include `Token` and `Room`
            return playerController.GetPlayer(player.Id ?? 1);
        }
    }
}
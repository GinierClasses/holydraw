using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers.ModelsControllers;
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
                return NotFound();
            var roomController = new MRoomController();
            var playerController = new MPlayerController();
            var tokenController = new MTokenController();

            var room = roomController.Add();
            var token = tokenController.Add();
            var player = playerController.Add(body.Username, body.AvatarUrl, true, room.Id ?? 1, token.Id ?? 1);
            // use `GetPlayer` to include `Token` and `Room`
            return playerController.GetPlayer(player.Id ?? 1);
        }
    }
}
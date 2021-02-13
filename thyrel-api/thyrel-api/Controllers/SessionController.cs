using System;
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
    public class SessionController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;

        public SessionController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        public class StartBody
        {
            public int RoomId;
        }

        // Call this endpoint to create a room
        // POST: api/room
        [HttpPost]
        public ActionResult<Player> Start([FromBody] StartBody body)
        {
            var sessionDataProvider = new SessionDataProvider();
            var playerDataProvider = new PlayerDataProvider();

            sessionDataProvider.Add(body.RoomId);

            playerDataProvider.GetPlayersByRoom(body.RoomId).ForEach(p => );

        }
    }
}
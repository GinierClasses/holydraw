using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private HolyDrawDbContext _context;

        public RoomController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _context = context;
        }

        // Call this endpoint to create a room
        // POST: api/room
        [HttpPost]
        public async Task<ActionResult<Player>> Post([FromBody] PlayerRoomBody body)
        {
            if (body.Username == null || body.AvatarUrl == null)
                return NotFound(); // 404 : most of api error
            var roomDataProvider = new RoomDataProvider(_context);
            var playerDataProvider = new PlayerDataProvider(_context);

            var room = await roomDataProvider.Add();
            var token = await new TokenDataProvider(_context).Add();
            var player = await playerDataProvider.Add(body.Username, body.AvatarUrl, true, room.Id, token.Id);
            // use `GetPlayer` to include `Token` and `Room`
            return await playerDataProvider.GetPlayer(player.Id);
        }

        // Call this endpoint to create a room
        // PATCH: api/room/join/roomidentifier
        [HttpPatch("join/{identifier}")]
        public async Task<ActionResult<Player>> Join(string identifier, [FromBody] PlayerRoomBody body)
        {
            if (body.Username == null || body.AvatarUrl == null)
                return NotFound(); // 404 : most of api error
            var room = await new RoomDataProvider(_context).GetRoom(identifier);
            if (room == null)
                return NotFound();
            var playerDataProvider = new PlayerDataProvider(_context);
            var token = await new TokenDataProvider(_context).Add();
            var player = await playerDataProvider.Add(body.Username, body.AvatarUrl, false, room.Id, token.Id);
            return await playerDataProvider.GetPlayer(player.Id);
        }

        // Call this endpoint to get a room
        // GET : api/room/identifier
        [HttpGet("{identifier}")]
        public async Task<ActionResult<Room>> GetRoom(string identifier)
        {
            var room = await new RoomDataProvider(_context).GetRoom(identifier);
            return room;
        }
        
        // Call this endpoint to get players of a room
        // GET : api/room/{id}/players
        [HttpGet("{roomId}/players")]
        public async Task<ActionResult<List<Player>>> GetPlayersByRoom(int roomId)
        {
            var player = await new PlayerDataProvider(_context).GetPlayersByRoom(roomId);
            return player;
        }

        public class PlayerRoomBody
        {
            public string AvatarUrl;
            public string Username;
        }
    }
}
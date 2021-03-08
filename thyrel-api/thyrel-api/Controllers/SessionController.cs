using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Newtonsoft.Json;
using thyrel_api.DataProvider;
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
        private HolyDrawDbContext _context;

        public SessionController(IWebsocketHandler websocketHandler, HolyDrawDbContext context)
        {
            _websocketHandler = websocketHandler;
            _context = context;
        }

        public class StartBody
        {
            public int RoomId;
        }

        // Call this endpoint to create a Session
        // POST: api/session
        [HttpPost]
        public async Task<ActionResult<Session>> Start([FromBody] StartBody body)
        {
            var sessionDataProvider = new SessionDataProvider(_context);
            var playerDataProvider = new PlayerDataProvider(_context);
            var elementDataProvider = new ElementDataProvider(_context);
            var addedSession = await sessionDataProvider.Add(body.RoomId);

            if (addedSession == null)
            {
                return NotFound();
            }

            var players = await playerDataProvider.GetPlayersByRoom(body.RoomId);
            players.ForEach(async p =>
                await elementDataProvider.AddSentence(p.Id, p.Id, 1, addedSession.Id));

            await _websocketHandler.SendMessageToSockets(
                Json.Json.Serialize(
                    new BaseWebsocketEventJson(WebsocketEvent.SessionStart)), body.RoomId);

            return addedSession;
        }
    }
}
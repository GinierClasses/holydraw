using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using thyrel_api.DataProvider;
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

        // Call this endpoint to create a Session
        // POST: api/session
        [HttpPost]
        public async Task<ActionResult<Session>> Start([FromBody] StartBody body)
        {
            var sessionDataProvider = new SessionDataProvider();
            var playerDataProvider = new PlayerDataProvider();
            var elementDataProvider = new ElementDataProvider();
            var addedSession = await sessionDataProvider.Add(body.RoomId);

            if (addedSession == null)
            {
                return NotFound();
            }

            playerDataProvider.GetPlayersByRoom(body.RoomId).ForEach(async p => await elementDataProvider.AddSentence(p.Id, p.Id, 1, addedSession.Id));

            await _websocketHandler.SendMessageToSockets(
                    JsonSerializer.Serialize(
                        new EventJson(WebsocketEvent.SessionStart)), body.RoomId);

            return addedSession;
        }
    }
}

using System.Threading.Tasks;
using thyrel_api.DataProvider;
using thyrel_api.Json;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Handler
{
    public class SessionStepTimeout
    {
        private readonly int _step;
        private readonly int _sessionId;
        private readonly HolyDrawDbContext _context;
        private readonly IWebsocketHandler _websocketHandler;


        public SessionStepTimeout(int step, int sessionId, HolyDrawDbContext context,
            IWebsocketHandler websocketHandler)
        {
            _step = step;
            _sessionId = sessionId;
            _context = context;
            _websocketHandler = websocketHandler;
        }

        public void RunTimeout(int delay)
        {
            Task.Delay(delay * 1000).ContinueWith(async _ =>
            {
                var sessionProvider = new SessionDataProvider(_context);
                var session = await sessionProvider.GetSessionById(_sessionId);
                // test if step is already finish
                if (session?.ActualStep != _step) return;
                session = await sessionProvider.NextStep(session);

                await _websocketHandler.SendMessageToSockets(
                    JSON.Serialize(
                        new SessionWebsocketEventJson(WebsocketEvent.SessionStart, session.ActualStep, session.StepType,
                            session.StepFinishAt, session.TimeDuration)), session.RoomId);
            });
        }
    }
}
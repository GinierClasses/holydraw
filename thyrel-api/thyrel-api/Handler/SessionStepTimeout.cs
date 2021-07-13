using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Handler
{
    public class SessionStepTimeout
    {
        private readonly string _connexionString;
        private readonly int _sessionId;
        private readonly int _step;
        private readonly IWebsocketHandler _websocketHandler;

        public SessionStepTimeout(int step, int sessionId, HolyDrawDbContext context,
            IWebsocketHandler websocketHandler)
        {
            _step = step;
            _sessionId = sessionId;
            // need connexion string because current context will be soon disposed
            _connexionString = context.Database.GetConnectionString();
            _websocketHandler = websocketHandler;
        }

        /// <summary>
        ///     Run timeout of delay. At end, is Session step is not already finish this will be automatically finish
        /// </summary>
        /// <param name="delay"></param>
        public void RunTimeout(int delay)
        {
            Task.Delay(delay * 1000).ContinueWith(async _ =>
            {
                var context = GetContext();
                var sessionProvider = new SessionDataProvider(context);
                var session = await sessionProvider.GetSessionById(_sessionId);
                // test if step is already finish
                if (session?.ActualStep != _step || session.FinishAt != null) return;
                session = await sessionProvider.NextStep(session);

                await session.RunNewTimeout(context, _websocketHandler);

                await context.DisposeAsync();
            });
        }

        /// <summary>
        ///     Create the context with the connection string
        /// </summary>
        /// <returns>The context created</returns>
        private HolyDrawDbContext GetContext()
        {
            return HolyDrawDbContextUtils.GetHolyDrawDbContext(_connexionString);
        }
    }
}
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
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
        private readonly string _connexionString;
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
                if (session?.ActualStep != _step && session?.FinishAt != null) return;
                session = await sessionProvider.NextStep(session);

                await _websocketHandler.SendMessageToSockets(
                    JsonBase.Serialize(
                        new SessionWebsocketEventJson(WebsocketEvent.SessionUpdate, session.ActualStep,
                            session.StepType,
                            session.StepFinishAt, session.TimeDuration, 0)), session.RoomId);

                if (session.StepType != SessionStepType.Book)
                    new SessionStepTimeout(session.ActualStep, session.Id, context, _websocketHandler).RunTimeout(
                        session.TimeDuration);

                await context.DisposeAsync();
            });
        }

        /// <summary>
        ///     Create the context with the connection string
        /// </summary>
        /// <returns>The context created</returns>
        private HolyDrawDbContext GetContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HolyDrawDbContext>();
            optionsBuilder.UseMySql(
                _connexionString,
                new MySqlServerVersion(new Version(8, 0, 23)),
                mySqlOptions => mySqlOptions
                    .CharSetBehavior(CharSetBehavior.NeverAppend));
            return new HolyDrawDbContext(optionsBuilder.Options);
        }
    }
}

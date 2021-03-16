using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
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

        public void RunTimeout(int delay)
        {
            Task.Delay(delay * 1000).ContinueWith(async _ =>
            {
                var context = GetContext();
                var sessionProvider = new SessionDataProvider(context);
                var session = await sessionProvider.GetSessionById(_sessionId);
                // test if step is already finish
                if (session?.ActualStep != _step) return;
                session = await sessionProvider.NextStep(session);

                await _websocketHandler.SendMessageToSockets(
                    JsonBase.Serialize(
                        new SessionWebsocketEventJson(WebsocketEvent.SessionUpdate, session.ActualStep, session.StepType,
                            session.StepFinishAt, session.TimeDuration)), session.RoomId);
            });
        }

        private HolyDrawDbContext GetContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HolyDrawDbContext>();
            optionsBuilder.UseMySql(
                _connexionString,
                new MySqlServerVersion(new Version(8, 0, 23)), // use MariaDbServerVersion for MariaDB
                mySqlOptions => mySqlOptions
                    .CharSetBehavior(CharSetBehavior.NeverAppend));
            return new HolyDrawDbContext(optionsBuilder.Options);
        }
    }
}
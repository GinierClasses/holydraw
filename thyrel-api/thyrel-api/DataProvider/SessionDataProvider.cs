using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class SessionDataProvider : ISessionDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public SessionDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
        }

        /// <summary>
        ///     Create a new Session
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="stepFinishAt"></param>
        /// <param name="timeDuration"></param>
        public async Task<Session> Add(int roomId, DateTime stepFinishAt, int timeDuration)
        {
            var sessionToAdd = new Session(null, roomId, stepFinishAt, timeDuration, SessionStepType.Start);

            if (await _holyDrawDbContext.Session.AnyAsync(s => s.RoomId == roomId && s.FinishAt == null))
                return null; // return la session start

            var entity = await _holyDrawDbContext.Session.AddAsync(sessionToAdd);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        ///     Set finishAt to DateTime.Now
        /// </summary>
        /// <param name="sessionId"></param>
        public async Task<Session> Finish(int sessionId)
        {
            var session = await _holyDrawDbContext.Session
                .FindAsync(sessionId);

            if (session == null)
                return null;
            session.FinishAt = DateTime.Now;

            await SaveChanges();
            return session;
        }

        /// <summary>
        /// To get a Session by it's id
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        public async Task<Session> GetSessionById(int sessionId)
        {
            var session = await _holyDrawDbContext.Session
                .FindAsync(sessionId);
            return session;
        }

        /// <summary>
        /// Get current session of a room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task<Session> GetCurrentSessionByRoomId(int roomId)
        {
            var session = await _holyDrawDbContext.Session
                .OrderBy(s => s.CreatedAt)
                .LastOrDefaultAsync(s => s.RoomId == roomId && s.FinishAt == null);
            return session;
        }

        public async Task<Session> StartSession(int roomId)
        {
            const int duration = 70;
            const int step = 1;
            
            var playerDataProvider = new PlayerDataProvider(_holyDrawDbContext);
            var elementDataProvider = new ElementDataProvider(_holyDrawDbContext);
            var addedSession = await Add(roomId, DateTime.Now.AddSeconds(duration), duration);
            
            if (addedSession == null)
                return null;

            await playerDataProvider.SetIsPlaying(roomId);
            var players = await playerDataProvider.GetPlayersByRoom(roomId);
            var elements = new List<Element>();
            players.ForEach(p => elements.Add(new Element(step, p.Id, p.Id, addedSession.Id, "")));
            await elementDataProvider.AddElements(elements);
            return addedSession;
        }

        public async Task<Session> NextStep(Session session)
        {
            var playerProvider = new PlayerDataProvider(_holyDrawDbContext);
            var elementProvider = new ElementDataProvider(_holyDrawDbContext);
            var result = (from p in _holyDrawDbContext.Player
                where p.RoomId == session.RoomId & p.IsPlaying
                select p).ToList();

            var elements = new List<Element>();
            var nextStep = session.ActualStep + 1;
            
            switch (session.StepType)
            {
                case SessionStepType.Start:
                    Console.WriteLine("Start case");
                    
                    result.ForEach(p =>
                    {
                        var element = new Element(nextStep, 2, p.Id, session.Id, 1);
                    });
                    session.StepType = SessionStepType.Draw;
                    break;
                
                case SessionStepType.Draw:
                    Console.WriteLine("Draw case");
                    session.StepType = SessionStepType.Draw;
                    break;
                
                case SessionStepType.Write:
                    Console.WriteLine("Write case");
                    break;
                
                case SessionStepType.Book:
                    Console.WriteLine("Start case");
                    break;
            }

            return session;
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}

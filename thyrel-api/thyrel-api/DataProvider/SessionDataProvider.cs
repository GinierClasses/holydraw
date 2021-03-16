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
            const int duration = 10;
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

        /// <summary>
        ///     Handle the next step.
        /// </summary>
        /// <param name="session">Session given from Context</param>
        /// <returns>The edited session</returns>
        /// <exception cref="Exception">If no element candidate.</exception>
        public async Task<Session> NextStep(Session session)
        {
            var elementProvider = new ElementDataProvider(_holyDrawDbContext);
            var players = await _holyDrawDbContext.Player
                .Where(p => p.RoomId == session.RoomId && p.IsPlaying).ToListAsync();

            // element for the next step
            if (session.ActualStep == players.Count)
            {
                // the game is finish, go to album
                session.StepType = SessionStepType.Book;
            }

            var nextStep = session.ActualStep + 1;
            session.ActualStep = nextStep;

            var elements = new List<Element>();
            var candidates = await elementProvider.GetNextCandidateElements(session.Id);

            players.ForEach(player =>
            {
                // get prev elements candidate for the player
                // var candidates = await elementProvider.GetNextCandidateElements(p, session.ActualStep);
                var playerCandidates = candidates.Where(e => e.CreatorId != player.Id && e.InitiatorId != player.Id);

                // Choose an prev element that has not yet been chosen by another player.
                var candidate = playerCandidates
                    .FirstOrDefault(c => elements.All(e => e.InitiatorId != c.InitiatorId));
                if (candidate == null)
                    throw new Exception("No element candidate valid.");
                
                // TODO : handle drawing or text, currently only create drawing for the first step
                var element = new Element(nextStep, player.Id, candidate.InitiatorId, session.Id, 1);
                elements.Add(element);
            });
            await elementProvider.AddElements(elements);

            switch (session.StepType)
            {
                case SessionStepType.Start:
                    // TODO : define a time for Drawing and Text, currently 3 minutes for drawing
                    session.StepFinishAt = DateTime.Now.AddMinutes(3);
                    session.StepType = SessionStepType.Draw;
                    break;
                case SessionStepType.Draw:
                    session.StepType = SessionStepType.Write;
                    break;
                case SessionStepType.Write:
                    session.StepType = SessionStepType.Draw;
                    break;
                case SessionStepType.Book:
                    Console.WriteLine("Book case");
                    break;
                default:
                    throw new Exception("Impossible switch case");
            }

            // update session
            await SaveChanges();

            return session;
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
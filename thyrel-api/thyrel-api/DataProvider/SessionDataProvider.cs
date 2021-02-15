using System;
using System.Threading.Tasks;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class SessionDataProvider : ISessionDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public SessionDataProvider()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }

        /// <summary>
        ///     Create a new Session
        /// </summary>
        /// <param name="roomId"></param>
        public async Task<Session> Add(int roomId)
        {
            var sessionToAdd = new Session(null, roomId);

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

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
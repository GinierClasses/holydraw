using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using thyrel_api.Models;

namespace thyrel_api.Controllers.ModelsControllers
{
    public class SessionDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public SessionDataProvider()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }
        
        /// <summary>
        /// Return list of drawings and texts
        /// </summary>
        /// <param name="playerId"></param>
        /// <returns></returns>
        public List<Element> GetAlbum(int playerId)
        {
            var album = _holyDrawDbContext.Element
                .Where(c => c.InitiatorId == playerId)
                .OrderBy(c => c.Step)
                .ToList();
            return album;
        }

        /// <summary>
        /// Create a new Session
        /// </summary>
        /// <param name="roomId"></param>
        public Session Add(int roomId) {
            var sessionToAdd = new Session(null, null, DateTime.Now, roomId);

            var entity = _holyDrawDbContext.Session.Add(sessionToAdd);
            SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        /// Set finishAt to DateTime.Now
        /// </summary>
        /// <param name="session"></param>
        public void Finish(Session session) {
            var dbSession = _holyDrawDbContext.Session
                .SingleOrDefault(s => s.Id == session.Id);
            if (dbSession == null)
                return;
            dbSession.FinishAt = DateTime.Now;
            try
            {
                _holyDrawDbContext.Session.Attach(session);
                _holyDrawDbContext.Entry(dbSession).State = EntityState.Modified;
                SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        private void SaveChanges()
        {
            _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
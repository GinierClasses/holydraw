using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class RoomDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public RoomDataProvider()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }

        /// <summary>
        /// Add a new room
        /// </summary>
        public async Task<Room> Add()
        {
            const string allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
            var random = new Random();
            var givenIdentifier = new string(
                Enumerable.Repeat(allChar, 16)
                    .Select(identifier => identifier[random.Next(identifier.Length)]).ToArray());

            var room = new Room(null, givenIdentifier, null);

            var entity = await _holyDrawDbContext.Room.AddAsync(room);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        /// To get a Room by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Room> GetRoom(int id)
        {
            var room = await _holyDrawDbContext.Room
                .Include(r => r.Players)
                .SingleOrDefaultAsync(p => p.Id == id);
            return room;
        }

        /// <summary>
        /// To get a Room by it's Identifier
        /// </summary>
        /// <param name="identifier"></param>
        /// <returns></returns>
        public async Task<Room> GetRoom(string identifier)
        {
            var room = await _holyDrawDbContext.Room
                .Include(r => r.Players)
                .SingleOrDefaultAsync(p => p.Identifier == identifier);
            return room;
        }

        /// <summary>
        /// To end a Room ( set the discard date to now)
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task<Room> Finish(int roomId)
        {
            var dbRoom = await _holyDrawDbContext.Room
                .SingleOrDefaultAsync(p => p.Id == roomId);
            if (dbRoom == null)
                return null;

            dbRoom.FinishAt = DateTime.Now;
            await SaveChanges();
            return dbRoom;
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.DataProvider
{
    public class RoomDataProvider : IRoomDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public RoomDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
        }
        
        /// <summary>
        ///     Add a new room
        /// </summary>
        public async Task<Room> Add()
        {
            const string allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
            var random = new Random();
            var givenIdentifier = new string(
                Enumerable.Repeat(allChar, 12)
                    .Select(identifier => identifier[random.Next(identifier.Length)]).ToArray());

            var room = new Room(givenIdentifier, RoomMode.Standard);

            var entity = await _holyDrawDbContext.Room.AddAsync(room);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        ///     To get a Room by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<RoomDto> GetRoom(int id)
        {
            var room = await _holyDrawDbContext.Room
                .Select(r => new RoomDto
                {
                    Id = r.Id,
                    CreatedAt = r.CreatedAt,
                    FinishAt = r.FinishAt,
                    Identifier = r.Identifier
                })
                .SingleOrDefaultAsync(p => p.Id == id);
            return room;
        }

        /// <summary>
        ///     To get a Room by it's Identifier
        /// </summary>
        /// <param name="identifier"></param>
        /// <returns></returns>
        public async Task<Room> GetRoom(string identifier)
        {
            var room = await _holyDrawDbContext.Room
                .SingleOrDefaultAsync(p => p.Identifier == identifier);
            return room;
        }

        /// <summary>
        ///     To end a Room ( set the discard date to now)
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task<Room> Finish(int? roomId)
        {
            var dbRoom = await _holyDrawDbContext.Room
                .FindAsync(roomId);
            if (dbRoom == null)
                return null;

            await FinishSessionsByRoomId(roomId);

            dbRoom.FinishAt = DateTime.Now;
            await SaveChanges();
            return dbRoom;
        }

        /// <summary>
        ///     To finish all sessions of a Room by its Id
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task FinishSessionsByRoomId(int? roomId)
        {
            await _holyDrawDbContext.Session
                .Where(s => s.RoomId == roomId && s.FinishAt == null)
                .ForEachAsync(s =>
                {
                    s.FinishAt = DateTime.Now;
                    s.StepFinishAt = null;
                });
            await SaveChanges();
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
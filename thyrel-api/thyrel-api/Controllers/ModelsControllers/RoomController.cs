using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using thyrel_api.Models;

namespace thyrel_api.Controllers.ModelsControllers
{
    public class RoomController
    {
        private HolyDrawDbContext _holyDrawDbContext { get; set; }
        public RoomController()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }
        /// <summary>
        /// Add a new room
        /// </summary>
        public void Add()
        {
            const string allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz-.";
            var random = new Random();
            var Identifier = new string(
                Enumerable.Repeat(allChar, 8)
                    .Select(identifier => identifier[random.Next(identifier.Length)]).ToArray());

            Room roomToAdd = new Room(null, Identifier, null, DateTime.Now);

            _holyDrawDbContext.Room.Add(roomToAdd);
            SaveChanges();
        }
        /// <summary>
        /// To get a Room by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Room GetRoom(int id)
        {
            var room = _holyDrawDbContext.Room.SingleOrDefault(p => p.Id == id);
            return room;
        }
        /// <summary>
        /// To end a Room ( set the discard date to now)
        /// </summary>
        /// <param name="room"></param>
        public void End(Room room)
        {
            var dbRoom = _holyDrawDbContext.Room.SingleOrDefault(p => p.Id == room.Id);
            if (dbRoom == null)
                return;
            dbRoom.FinishAt = DateTime.Now;
            try
            {
                _holyDrawDbContext.Room.Attach(room);
                _holyDrawDbContext.Entry(dbRoom).State = EntityState.Modified;
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
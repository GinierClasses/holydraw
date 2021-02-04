using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using thyrel_api.Models;

namespace thyrel_api.Controllers.ModelsControllers
{
    public class PlayerController
    {
        private HolyDrawDbContext _holyDrawDbContext { get; set; }
        public PlayerController()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }
        /// <summary>
        /// To add a new Player
        /// </summary>
        /// <param name="username"></param>
        /// <param name="avatarUrl"></param>
        /// <param name="isOwner"></param>
        /// <param name="createdAt"></param>
        public void Add(string username, string avatarUrl, bool isOwner, int roomId)
        {

            Player playerToAdd = new Player(null, username, avatarUrl, isOwner, null, DateTime.Now, roomId);

            _holyDrawDbContext.Player.Add(playerToAdd);
            SaveChanges();
        }
        /// <summary>
        /// To get a Player by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Player GetPlayer(int id)
        {
            var player = _holyDrawDbContext.Player.SingleOrDefault(p => p.Id == id);
            return player;
        }
        /// <summary>
        /// To disable a Player ( set the discard date to now)
        /// </summary>
        /// <param name="player"></param>
        public void Disable(Player player)
        {
            var dbPlayer = _holyDrawDbContext.Player.SingleOrDefault(p => p.Id == player.Id);
            if (dbPlayer == null)
                return;
            player.DisableAt = DateTime.Now;
            try
            {
                _holyDrawDbContext.Player.Attach(player);
                _holyDrawDbContext.Entry(dbPlayer).State = EntityState.Modified;
                SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        /// <summary>
        /// Set the Player as Owner
        /// </summary>
        /// <param name="player"></param>
        public void SetOwner(Player player)
        {
            var dbPlayer = _holyDrawDbContext.Player.SingleOrDefault(p => p.Id == player.Id);
            if (dbPlayer == null)
                return;
            player.IsOwner = true;
            try
            {
                _holyDrawDbContext.Player.Attach(player);
                _holyDrawDbContext.Entry(dbPlayer).State = EntityState.Modified;
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

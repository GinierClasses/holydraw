using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class PlayerDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public PlayerDataProvider()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }

        /// <summary>
        /// To add a new Player
        /// </summary>
        /// <param name="username"></param>
        /// <param name="avatarUrl"></param>
        /// <param name="isOwner"></param>
        /// <param name="roomId"></param>
        public Player Add(string username, string avatarUrl, bool isOwner, int roomId, int tokenId)
        {
            var playerToAdd = new Player(null, username, avatarUrl, isOwner, null, DateTime.Now, roomId, tokenId);

            var entity = _holyDrawDbContext.Player.Add(playerToAdd);
            SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        /// To get a Player by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The player</returns>
        public Player GetPlayer(int id)
        {
            var player = _holyDrawDbContext.Player
                .Include(p => p.Room)
                .Include(p => p.Token)
                .SingleOrDefault(p => p.Id == id);
            return player;
        }

        /// <summary>
        /// To get a Player by it's ID
        /// </summary>
        /// <param name="tokenKey"></param>
        /// <returns></returns>
        public Player GetPlayerByToken(string tokenKey)
        {
            var player = _holyDrawDbContext.Player
                .Include(p => p.Token)
                .SingleOrDefault(p => p.Token.TokenKey == tokenKey);
            return player;
        }


        /// <summary>
        /// To disable a Player (set the discard date to now)
        /// </summary>
        /// <param name="player"></param>
        public void Disable(Player player)
        {
            var dbPlayer = _holyDrawDbContext.Player.SingleOrDefault(p => p.Id == player.Id);
            if (dbPlayer == null)
                return;
            player.DisableAt = DateTime.Now;
            UpdatePlayer(dbPlayer, player);
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
            UpdatePlayer(dbPlayer, player);
        }

        public void SetIsPlaying(Player player, bool isPlaying)
        {
            var dbPlayer = _holyDrawDbContext.Player.SingleOrDefault(p => p.Id == player.Id);
            if (dbPlayer == null)
                return;
            player.IsPlaying = isPlaying;
            UpdatePlayer(dbPlayer, player);
        }

        private void UpdatePlayer(Player dbPlayer, Player player)
        {
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
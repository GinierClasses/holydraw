using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class PlayerDataProvider : IPlayerDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public PlayerDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
        }

        public PlayerDataProvider(DbContextOptions<HolyDrawDbContext> options)
        {
            _holyDrawDbContext = new HolyDrawDbContext(options);
        }

        /// <summary>
        ///     To add a new Player
        /// </summary>
        /// <param name="username"></param>
        /// <param name="avatarUrl"></param>
        /// <param name="isOwner"></param>
        /// <param name="roomId"></param>
        /// <param name="tokenId"></param>
        public async Task<Player> Add(string username, string avatarUrl, bool isOwner, int roomId, int tokenId)
        {
            var player = new Player(username, avatarUrl, isOwner, null, roomId, tokenId);

            var entity = await _holyDrawDbContext.Player.AddAsync(player);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        ///     To get a Player by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The player</returns>
        public async Task<Player> GetPlayer(int id)
        {
            var player = await _holyDrawDbContext.Player
                .Include(p => p.Room)
                .Include(p => p.Token)
                .SingleOrDefaultAsync(p => p.Id == id);
            return player;
        }

        /// <summary>
        ///     To get a Player by it's ID
        /// </summary>
        /// <param name="tokenKey"></param>
        /// <returns></returns>
        public async Task<Player> GetPlayerByToken(string tokenKey)
        {
            var player = await _holyDrawDbContext.Player
                .Include(p => p.Token)
                .SingleOrDefaultAsync(p => p.Token.TokenKey == tokenKey);
            return player;
        }

        /// <summary>
        /// To get a Players by it's room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task<List<Player>> GetPlayersByRoom(int roomId)
        {
            var player = await _holyDrawDbContext.Player
                .Where(p => p.RoomId == roomId && p.IsConnected).ToListAsync();
            return player;
        }

        /// <summary>
        ///     To disable a Player (set the discard date to now)
        /// </summary>
        /// <param name="playerId"></param>
        public async Task<Player> Disable(int playerId)
        {
            var player = await _holyDrawDbContext.Player.FindAsync(playerId);
            if (player == null)
                return null;

            player.DisableAt = DateTime.Now;
            await SaveChanges();
            return player;
        }

        /// <summary>
        ///     Set the Player as Owner
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="isOwner"></param>
        public async Task<Player> SetOwner(Player player, bool isOwner = true)
        {
            if (player == null)
                return null;

            player.IsOwner = isOwner;
            await SaveChanges();
            return player;
        }

        /// <summary>
        ///     Handle isPlayer (when session start) column
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="isPlaying"></param>
        /// <returns></returns>
        public async Task<Player> SetIsPlaying(int playerId, bool isPlaying)
        {
            var dbPlayer = await _holyDrawDbContext.Player.FindAsync(playerId);
            if (dbPlayer == null)
                return null;

            dbPlayer.IsPlaying = isPlaying;
            await SaveChanges();
            return dbPlayer;
        }

        /// <summary>
        ///     Handle isConnected (when user left) column
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="isConnected"></param>
        /// <returns></returns>
        public async Task<Player> SetIsConnected(int playerId, bool isConnected)
        {
            var dbPlayer = await _holyDrawDbContext.Player.FindAsync(playerId);
            if (dbPlayer == null)
                return null;

            dbPlayer.IsConnected = isConnected;
            
            await SaveChanges();
            return dbPlayer;
        }

        /// <summary>
        /// Find a new owner for a room
        /// </summary>
        /// <param name="roomId">Room to find a owner</param>
        /// <returns></returns>
        public async Task<Player> FindNewOwner(int roomId)
        {
            var firstPlayerConnected = await _holyDrawDbContext.Player
                .Where(p => p.RoomId == roomId && p.IsConnected && !p.IsOwner)
                .FirstOrDefaultAsync();

            if (firstPlayerConnected == null)
                return null;

            await SetOwner(firstPlayerConnected);
            return firstPlayerConnected;
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
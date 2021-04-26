using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.DataProvider
{
    public class PlayerDataProvider : IPlayerDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public PlayerDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
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
            var player = new Player(username, avatarUrl, isOwner, roomId, tokenId);

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
                .Include(p => p.Room)
                .SingleOrDefaultAsync(p => p.Token.TokenKey == tokenKey);
            return player;
        }

        /// <summary>
        /// To get a Players by it's room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task<List<PlayerDto>> GetPlayersByRoom(int roomId)
        {
            var players = await _holyDrawDbContext.Player
                .Where(p => p.RoomId == roomId && p.IsConnected).Select(p => new PlayerDto()
                {
                    Id = p.Id,
                    Username = p.Username,
                    AvatarUrl = p.AvatarUrl,
                    IsOwner = p.IsOwner,
                    IsPlaying = p.IsPlaying,
                    IsConnected = p.IsConnected,
                    CreatedAt = p.CreatedAt,
                    DisableAt = p.DisableAt,
                    RoomId = p.RoomId
                }).ToListAsync();
            return players;
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
        /// <param name="player"></param>
        /// <param name="isOwner"></param>
        public async Task<Player> SetOwner(Player player, bool isOwner = true)
        {
            if (player == null || player.IsOwner == isOwner)
                return null;

            player.IsOwner = isOwner;
            await SaveChanges();
            return player;
        }

        /// <summary>
        ///     Handle isPlayer (when session start) column
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="isPlaying"></param>
        /// <returns></returns>
        public async Task SetIsPlaying(int roomId, bool isPlaying = true)
        {
            var players = _holyDrawDbContext.Player.Where(p => p.RoomId == roomId && p.IsConnected)
                .ForEachAsync(p => p.IsPlaying = isPlaying);
            players.Wait();
            await SaveChanges();
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
        ///     Delete Room from the player (kick a player from the room)
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        public async Task<Player> KickPlayerFromRoom(Player player)
        {
            if (player == null)
                return null;

            player.RoomId = null;
            await SaveChanges();
            return player;
        }

        /// <summary>
        ///     Find a new owner for a room
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
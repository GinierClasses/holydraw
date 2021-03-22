using System.Collections.Generic;
using System.Threading.Tasks;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.DataProvider
{
    public interface IPlayerDataProvider
    {
        /// <summary>
        ///     To add a new Player
        /// </summary>
        /// <param name="username"></param>
        /// <param name="avatarUrl"></param>
        /// <param name="isOwner"></param>
        /// <param name="roomId"></param>
        /// <param name="tokenId"></param>
        Task<Player> Add(string username, string avatarUrl, bool isOwner, int roomId, int tokenId);

        /// <summary>
        ///     To get a Player by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The player</returns>
        Task<Player> GetPlayer(int id);

        /// <summary>
        ///     To get a Player by it's ID
        /// </summary>
        /// <param name="tokenKey"></param>
        /// <returns></returns>
        Task<Player> GetPlayerByToken(string tokenKey);

        /// <summary>
        ///     To disable a Player (set the discard date to now)
        /// </summary>
        /// <param name="playerId"></param>
        Task<Player> Disable(int playerId);

        /// <summary>
        ///     Set the Player as Owner
        /// </summary>
        /// <param name="player"></param>
        /// <param name="isOwner"></param>
        Task<Player> SetOwner(Player player, bool isOwner = true);

        /// <summary>
        ///     Handle isPlayer (when session start) column
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="isPlaying"></param>
        /// <returns></returns>
        Task SetIsPlaying(int roomId, bool isPlaying);

        /// <summary>
        ///     Handle isConnected (when user left) column
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="isConnected"></param>
        /// <returns></returns>
        Task<Player> SetIsConnected(int playerId, bool isConnected);

        /// <summary>
        /// To get a Players by it's room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<List<PlayerDto>> GetPlayersByRoom(int roomId);

        /// <summary>
        /// Kick a player from his room using his ID
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        Task<Player> KickPlayerFromRoom(Player player);

        /// <summary>
        /// Find a new owner for a room
        /// </summary>
        /// <param name="roomId">Room to find a owner</param>
        /// <returns></returns>
        Task<Player> FindNewOwner(int roomId);
    }
}
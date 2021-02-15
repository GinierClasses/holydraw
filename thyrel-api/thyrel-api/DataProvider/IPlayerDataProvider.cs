using System.Threading.Tasks;
using thyrel_api.Models;

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
        /// <param name="playerId"></param>
        /// <param name="isOwner"></param>
        Task<Player> SetOwner(int playerId, bool isOwner = true);

        /// <summary>
        ///     Handle isPlayer (when session start) column
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="isPlaying"></param>
        /// <returns></returns>
        Task<Player> SetIsPlaying(int playerId, bool isPlaying);
    }
}
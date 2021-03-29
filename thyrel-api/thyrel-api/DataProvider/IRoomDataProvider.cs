using System.Threading.Tasks;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public interface IRoomDataProvider
    {
        /// <summary>
        ///     Add a new room
        /// </summary>
        Task<Room> Add();

        /// <summary>
        ///     To get a Room by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Room> GetRoom(int id);

        /// <summary>
        ///     To get a Room by it's Identifier
        /// </summary>
        /// <param name="identifier"></param>
        /// <returns></returns>
        Task<Room> GetRoom(string identifier);

        /// <summary>
        ///     To end a Room ( set the discard date to now)
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<Room> Finish(int? roomId);
    }
}
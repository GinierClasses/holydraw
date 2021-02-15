using System.Threading.Tasks;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public interface ISessionDataProvider
    {
        /// <summary>
        ///     Create a new Session
        /// </summary>
        /// <param name="roomId"></param>
        Task<Session> Add(int roomId);

        /// <summary>
        ///     Set finishAt to DateTime.Now
        /// </summary>
        /// <param name="sessionId"></param>
        Task<Session> Finish(int sessionId);
    }
}
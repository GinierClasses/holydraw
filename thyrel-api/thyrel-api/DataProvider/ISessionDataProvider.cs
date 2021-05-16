using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.DataProvider
{
    public interface ISessionDataProvider
    {
        /// <summary>
        ///     Create a new Session
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="stepFinishAt"></param>
        /// <param name="timeDuration"></param>
        /// <param name="playerCount"></param>
        Task<Session> Add(int roomId, DateTime stepFinishAt, int timeDuration, int playerCount);

        /// <summary>
        ///     Set finishAt to DateTime.Now
        /// </summary>
        /// <param name="sessionId"></param>
        Task<Session> Finish(int sessionId);

        /// <summary>
        /// To get a Session by it's id
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        Task<Session> GetSessionById(int sessionId);

        /// <summary>
        /// Get current session of a room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<SessionDto> GetCurrentSessionByRoomId(int roomId);

        /// <summary>
        /// Checks if current step is finished
        /// </summary>
        /// <param name="session"></param>
        /// <returns></returns>
        Task<PlayerStatusDto> GetPlayerStatus(Session session);

        /// <summary>
        ///     Start a session for a room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<Session> StartSession(int roomId);

        /// <summary>
        ///     Handle the next step.
        /// </summary>
        /// <param name="session">Session given from Context</param>
        /// <returns>The edited session</returns>
        /// <exception cref="Exception">If no element candidate.</exception>
        Task<Session> NextStep(Session session);

        /// <summary>
        ///     Generate future candidates for each players
        /// </summary>
        /// <param name="players">players in session</param>
        /// <param name="candidates">all elements from the session</param>
        /// <param name="nextStep">number of the next step</param>
        /// <param name="sessionId">id of the session</param>
        /// <param name="type">Type of element</param>
        /// <returns>future elements candidate</returns>
        /// <exception cref="Exception">if no candidate can be created</exception>
        List<Element> GetNextCandidatesElements(List<Player> players,
            List<ElementCandidateDto> candidates, int nextStep, int sessionId, ElementType type);

        /// <summary>
        ///     Run the next album for a specified roomId
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns>Session that start the album</returns>
        Task<Session> NextAlbum(int roomId);

        /// <summary>
        /// Get current session of a room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<List<PlayerDto>> GetCurrentPlayersInSession(int roomId);

        /// <summary>
        /// Recovery the album in the current state
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        Task<List<ElementAlbumDto>> AlbumRecovery(int roomId);
    }
}
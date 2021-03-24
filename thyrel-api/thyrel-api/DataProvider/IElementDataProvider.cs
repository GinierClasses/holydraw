using System.Collections.Generic;
using System.Threading.Tasks;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.DataProvider
{
    public interface IElementDataProvider
    {
        /// <summary>
        ///     Create a Drawing Element
        /// </summary>
        /// <param name="creatorId"></param>
        /// <param name="initiatorId"></param>
        /// <param name="step"></param>
        /// <param name="sessionId"></param>
        /// <param name="drawImage"></param>
        /// <param name="drawingId"></param>
        /// <returns></returns>
        Task<Element> AddDrawing(int creatorId, int initiatorId, int step, int sessionId);

        /// <summary>
        ///     Create a Sentence Element
        /// </summary>
        /// <param name="creatorId"></param>
        /// <param name="initiatorId"></param>
        /// <param name="step"></param>
        /// <param name="sessionId"></param>
        /// <param name="text"></param>
        /// <returns>An element</returns>
        Task<Element> AddSentence(int creatorId, int initiatorId, int step, int sessionId, string text = "");

        /// <summary>
        /// Add a list of elements
        /// </summary>
        /// <param name="elements"></param>
        /// <returns></returns>
        Task AddElements(List<Element> elements);

        /// <summary>
        ///     Set the sentence into a Element
        /// </summary>
        /// <param name="element"></param>
        /// <param name="sentence"></param>
        /// <returns></returns>
        Task SetSentence(Element element, string sentence);

        /// <summary>
        ///     Set the DrawImage into a Element
        /// </summary>
        /// <param name="element"></param>
        /// <param name="drawImage"></param>
        /// <returns></returns>
        Task SetDrawing(Element element, string drawImage);

        /// <summary>
        ///     Handle finish State
        /// </summary>
        /// <param name="elementId">elementId to handle</param>
        /// <param name="isFinish">true = element finish, false = element not finish</param>
        /// <returns>Edited element</returns>
        Task<Element> HandleFinish(int elementId);

        /// <summary>
        ///     Album of this InitiatorId
        /// </summary>
        /// <param name="initiatorId"></param>
        /// <returns></returns>
        Task<List<Element>> GetAlbum(int initiatorId);

        /// <summary>
        ///     Get one element by those ID
        /// </summary>
        /// <param name="elementId"></param>
        /// <returns></returns>
        Task<Element> GetElement(int elementId);

        /// <summary>
        ///     Get candidates from Sessions
        /// </summary>
        /// <param name="sessionId">Id of session</param>
        /// <returns>Element Candidates of Session</returns>
        Task<List<ElementCandidateDto>> GetNextCandidateElements(int sessionId);

        /// <summary>
        ///     Get current by playerId
        /// </summary>
        /// <param name="playerId"></param>
        /// <returns></returns>
        Task<ElementDto> GetCurrentElement(int playerId);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using thyrel_api.Models;

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
        /// <param name="drawingId"></param>
        /// <returns></returns>
        Task<Element> AddDrawing(int creatorId, int initiatorId, int step, int sessionId, int? drawingId = null);

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
        ///     Set the sentence into a Element
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="sentence"></param>
        /// <returns></returns>
        Task<Element> SetSentence(int elementId, string sentence);

        /// <summary>
        ///     Set the DrawingId into a Element
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="drawingId"></param>
        /// <returns></returns>
        Task<Element> SetDrawing(int elementId, int drawingId);

        /// <summary>
        ///     Handle finish State
        /// </summary>
        /// <param name="elementId">elementId to handle</param>
        /// <param name="isFinish">true = element finish, false = element not finish</param>
        /// <returns>Edited element</returns>
        Task<Element> HandleFinish(int elementId, bool isFinish);

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
    }
}
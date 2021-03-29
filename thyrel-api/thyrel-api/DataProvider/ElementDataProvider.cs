using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.DataProvider
{
    public class ElementDataProvider : IElementDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public ElementDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
        }

        /// <summary>
        ///     Create a Drawing Element
        /// </summary>
        /// <param name="creatorId"></param>
        /// <param name="initiatorId"></param>
        /// <param name="step"></param>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        public async Task<Element> AddDrawing(int creatorId, int initiatorId, int step, int sessionId)
        {
            var element = new Element(step, creatorId, initiatorId, sessionId, ElementType.Drawing);
            var entity = await _holyDrawDbContext.Element.AddAsync(element);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        ///     Create a Sentence Element
        /// </summary>
        /// <param name="creatorId"></param>
        /// <param name="initiatorId"></param>
        /// <param name="step"></param>
        /// <param name="sessionId"></param>
        /// <param name="text"></param>
        /// <returns>An element</returns>
        public async Task<Element> AddSentence(int creatorId, int initiatorId, int step, int sessionId,
            string text = "")
        {
            var element = new Element(step, creatorId, initiatorId, sessionId, ElementType.Sentence);
            var entity = await _holyDrawDbContext.Element.AddAsync(element);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        /// Add a list of elements
        /// </summary>
        /// <param name="elements"></param>
        /// <returns></returns>
        public async Task AddElements(List<Element> elements)
        {
            elements.ForEach(async e =>
                await _holyDrawDbContext.Element.AddAsync(e));

            await SaveChanges();
        }

        /// <summary>
        ///     Set the sentence into a Element
        /// </summary>
        /// <param name="element"></param>
        /// <param name="sentence"></param>
        /// <returns></returns>
        public async Task SetSentence(Element element, string sentence)
        {
            if (element == null) return;

            element.Text = sentence;
            await SaveChanges();
        }

        /// <summary>
        ///     Set the DrawImage into a Element
        /// </summary>
        /// <param name="element"></param>
        /// <param name="drawImage"></param>
        /// <returns></returns>
        public async Task SetDrawing(Element element, string drawImage)
        {
            if (element == null) return;

            element.DrawImage = drawImage;
            await SaveChanges();
        }

        /// <summary>
        ///     Handle finish State
        /// </summary>
        /// <param name="elementId">elementId to handle</param>
        /// <returns>Edited element</returns>
        public async Task<Element> HandleFinish(int elementId)
        {
            var element = await _holyDrawDbContext.Element.SingleOrDefaultAsync(e => e.Id == elementId);

            if (element == null)
                return null;

            if (element.FinishAt == null)
                element.FinishAt = DateTime.Now;
            else
                element.FinishAt = null;

            await SaveChanges();
            return element;
        }

        /// <summary>
        ///     Album of this InitiatorId
        /// </summary>
        /// <param name="initiatorId"></param>
        /// <returns></returns>
        public async Task<List<Element>> GetAlbum(int initiatorId)
        {
            var element = await _holyDrawDbContext.Element
                .Where(e => e.InitiatorId == initiatorId)
                .OrderBy(e => e.Step)
                .ToListAsync();
            return element;
        }

        /// <summary>
        ///     Get one element by those ID
        /// </summary>
        /// <param name="elementId"></param>
        /// <returns></returns>
        public async Task<Element> GetElement(int elementId)
        {
            return await _holyDrawDbContext.Element.FindAsync(elementId);
        }


        /// <summary>
        ///   Get The Current Element Of a player
        /// </summary>
        /// <param name="playerId"></param>
        /// <returns></returns>
        public async Task<ElementStepDto> GetCurrentElement(int playerId)
        {
            var elementWithParent = await _holyDrawDbContext.Element
                .OrderByDescending(e => e.Step)
                .Where(e => e.CreatorId == playerId)
                .Select(e => new ElementDto
                {
                    Id = e.Id,
                    Step = e.Step,
                    Type = e.Type,
                    Text = e.Text,
                    DrawingId = e.DrawingId,
                    FinishAt = e.FinishAt,
                    CreatedAt = e.CreatedAt,
                    SessionId = e.SessionId,
                })
                .Take(2)
                .ToListAsync();

            var result = new ElementStepDto(elementWithParent[0],
                elementWithParent.Count > 1 ? elementWithParent[1] : null);

            return result;
        }

        /// <summary>
        ///     Get candidates from Sessions
        /// </summary>
        /// <param name="sessionId">Id of session</param>
        /// <returns>Element Candidates of Session</returns>
        public async Task<List<ElementCandidateDto>> GetNextCandidateElements(int sessionId)
        {
            var elements = await _holyDrawDbContext.Element
                .Where(e => e.SessionId == sessionId).Select(e => new ElementCandidateDto
                {
                    Id = e.Id,
                    Step = e.Step,
                    InitiatorId = e.InitiatorId,
                    CreatorId = e.CreatorId
                }).ToListAsync();
            return elements;
        }


        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
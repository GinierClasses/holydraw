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
        ///     Add a list of elements
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
        /// <param name="id"></param>
        /// <param name="sentence"></param>
        /// <returns></returns>
        public async Task SetSentence(int id, string sentence)
        {
            await _holyDrawDbContext.Element.Where(e => e.Id == id).ForEachAsync(e => e.Text = sentence);
            await SaveChanges();
        }

        /// <summary>
        ///     Set the DrawImage into a Element
        /// </summary>
        /// <param name="id"></param>
        /// <param name="drawImage"></param>
        /// <returns></returns>
        public async Task SetDrawing(int id, string drawImage)
        {
            await _holyDrawDbContext.Element.Where(e => e.Id == id).ForEachAsync(e => e.DrawImage = drawImage);
            await SaveChanges();
        }

        /// <summary>
        ///     Handle finish State
        /// </summary>
        /// <param name="elementId">elementId to handle</param>
        /// <param name="elementDto"></param>
        /// <returns>Edited element</returns>
        public async Task<Element> HandleFinish(int elementId, FinishElementDto elementDto = null)
        {
            var element = await _holyDrawDbContext.Element.SingleOrDefaultAsync(e => e.Id == elementId);

            if (element == null)
                return null;

            if (element.FinishAt == null)
            {
                element.FinishAt = DateTime.Now;

                if (element.Type == ElementType.Sentence)
                    element.Text = elementDto?.Text;
                else
                    element.DrawImage = elementDto?.DrawImage;
            }
            else
            {
                element.FinishAt = null;
            }

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
        public async Task<ElementDto> GetElement(int elementId)
        {
            return await _holyDrawDbContext.Element.Select(e => new ElementDto
            {
                Id = e.Id,
                Step = e.Step,
                CreatorId = e.CreatorId,
                Type = e.Type,
                Text = e.Text,
                DrawImage = e.DrawImage,
                FinishAt = e.FinishAt,
                CreatedAt = e.CreatedAt,
                SessionId = e.SessionId
            }).FirstOrDefaultAsync(e => e.Id == elementId);
        }

        /// <summary>
        ///     Will edit the Body with verified values using the session settings
        /// </summary>
        /// <param name="body"></param>
        /// <param name="session"></param>
        /// <returns></returns>
        public void UpdateFinishElementDto(FinishElementDto body, Session session)
        {
            try
            {
                if (session.Mode == RoomMode.OneWord) body.Text = body.Text.Split(" ")[0];
            }
            catch (Exception e)
            {
                // ignored
            }
        }

        /// <summary>
        ///     Get The Current Element Of a player
        /// </summary>
        /// <param name="playerId"></param>
        /// <returns></returns>
        public async Task<ElementStepDto> GetCurrentElement(int playerId)
        {
            var currentElement = await _holyDrawDbContext.Element
                .OrderByDescending(e => e.SessionId)
                .ThenByDescending(e => e.Step)
                .Where(e => e.CreatorId == playerId)
                .Select(e => new CurrentElementDto
                {
                    Id = e.Id,
                    Step = e.Step,
                    Type = e.Type,
                    Text = e.Text,
                    FinishAt = e.FinishAt,
                    CreatedAt = e.CreatedAt,
                    SessionId = e.SessionId,
                    DrawImage = e.DrawImage,
                    InitiatorId = e.InitiatorId
                })
                .FirstAsync();


            if (currentElement.Step == 1) return new ElementStepDto(currentElement);

            var parentElement = await _holyDrawDbContext.Element
                .OrderByDescending(e => e.SessionId)
                .ThenByDescending(e => e.Step)
                .Where(e => e.InitiatorId == currentElement.InitiatorId && e.Step == currentElement.Step - 1)
                .Select(e => new ElementDto
                {
                    Id = e.Id,
                    Text = e.Text,
                    DrawImage = e.DrawImage
                })
                .FirstAsync();
            return new ElementStepDto(currentElement, parentElement);
        }

        /// <summary>
        ///     Get candidates from Sessions
        /// </summary>
        /// <param name="sessionId">Id of session</param>
        /// <returns>Element Candidates of Session</returns>
        public async Task<List<ElementCandidateDto>> GetNextCandidateElements(int sessionId)
        {
            var elements = await _holyDrawDbContext.Element
                .OrderBy(e => e.InitiatorId)
                .Where(e => e.SessionId == sessionId)
                .Select(e => new ElementCandidateDto
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
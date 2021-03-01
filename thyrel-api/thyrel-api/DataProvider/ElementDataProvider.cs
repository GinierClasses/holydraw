using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class ElementDataProvider : IElementDataProvider
    {
        private HolyDrawDbContext _holyDrawDbContext;

        public ElementDataProvider()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }

        public ElementDataProvider(DbContextOptions<HolyDrawDbContext> options)
        {
            _holyDrawDbContext = new HolyDrawDbContext(options);
        }

        /// <summary>
        ///     Create a Drawing Element
        /// </summary>
        /// <param name="creatorId"></param>
        /// <param name="initiatorId"></param>
        /// <param name="step"></param>
        /// <param name="sessionId"></param>
        /// <param name="drawingId"></param>
        /// <returns></returns>
        public async Task<Element> AddDrawing(int creatorId, int initiatorId, int step, int sessionId,
            int? drawingId = null)
        {
            var element = new Element(step, creatorId, initiatorId, sessionId, drawingId);

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
            var element = new Element(step, creatorId, initiatorId, sessionId, text);

            var entity = await _holyDrawDbContext.Element.AddAsync(element);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        ///     Set the sentence into a Element
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="sentence"></param>
        /// <returns></returns>
        public async Task<Element> SetSentence(int elementId, string sentence)
        {
            var element = await _holyDrawDbContext.Element.SingleOrDefaultAsync(e => e.Id == elementId);

            if (element == null)
                return null;

            element.Text = sentence;
            await SaveChanges();
            return element;
        }

        /// <summary>
        ///     Set the DrawingId into a Element
        /// </summary>
        /// <param name="elementId"></param>
        /// <param name="drawingId"></param>
        /// <returns></returns>
        public async Task<Element> SetDrawing(int elementId, int drawingId)
        {
            var element = await _holyDrawDbContext.Element.SingleOrDefaultAsync(e => e.Id == elementId);

            if (element == null)
                return null;

            element.DrawingId = drawingId;
            await SaveChanges();
            return element;
        }

        /// <summary>
        ///     Handle finish State
        /// </summary>
        /// <param name="elementId">elementId to handle</param>
        /// <param name="isFinish">true = element finish, false = element not finish</param>
        /// <returns>Edited element</returns>
        public async Task<Element> HandleFinish(int elementId, bool isFinish)
        {
            var element = await _holyDrawDbContext.Element.SingleOrDefaultAsync(e => e.Id == elementId);

            if (element == null)
                return null;

            if (isFinish)
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

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
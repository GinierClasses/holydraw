using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class ReactionDataProvider : IReactionDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public ReactionDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
        }

        /// <summary>
        ///     Add a reaction
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="elementId"></param>
        /// <param name="emojiReaction"></param>
        /// <returns></returns>
        public async Task<Reaction> AddReaction(int playerId, int elementId, EmojiReaction emojiReaction)
        {
            var isAlreadyReaction =
                await _holyDrawDbContext.Reaction
                    .FirstOrDefaultAsync(r => r.PlayerId == playerId && r.ElementId == elementId);

            if (isAlreadyReaction != null)
                return null;

            var reaction = new Reaction(playerId, elementId, emojiReaction);

            var entity = await _holyDrawDbContext.Reaction.AddAsync(reaction);
            await SaveChanges();
            return entity.Entity;
        }

        /// <summary>
        ///     Remove a reaction
        /// </summary>
        /// <param name="reactionId"></param>
        /// <param name="playerId"></param>
        /// <returns></returns>
        public async Task<Reaction> RemoveReaction(int reactionId, int playerId)
        {
            var reaction = await _holyDrawDbContext.Reaction.FindAsync(reactionId);
            if (reaction.PlayerId != playerId)
                return null;

            _holyDrawDbContext.Reaction.Remove(reaction);
            await SaveChanges();
            return reaction;
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
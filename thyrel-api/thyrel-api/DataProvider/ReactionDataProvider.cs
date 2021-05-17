using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<Reaction> AddReaction(int playerId, int elementId, EmojiReaction emojiReaction)
        {
            var reaction = new Reaction(playerId, elementId, emojiReaction);
            
            var entity = await _holyDrawDbContext.Reaction.AddAsync(reaction);
            await SaveChanges();
            return entity.Entity;
        }

        public async Task RemoveReaction(int reactionId)
        {
            _holyDrawDbContext.Reaction.RemoveRange(_holyDrawDbContext.Reaction.Where(r => r.Id == reactionId));
            await SaveChanges();
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}

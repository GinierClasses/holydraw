using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public interface IReactionDataProvider
    {
        Task<Reaction> AddReaction(int playerId, int elementId, EmojiReaction emojiReaction);

        Task<Reaction> RemoveReaction(int reactionId, int playerId);
    }
}

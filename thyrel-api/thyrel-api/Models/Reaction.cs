namespace thyrel_api.Models
{
    public class Reaction
    {
        public Reaction()
        {
        }

        public Reaction(int playerId, int elementId, EmojiReaction emoji)
        {
            PlayerId = playerId;
            ElementId = elementId;
            Emoji = emoji;
        }

        public int Id { get; set; }
        public EmojiReaction Emoji { get; set; }

        public int ElementId { get; set; }
        public virtual Element Element { get; set; }

        public int PlayerId { get; set; }
        public virtual Player Player { get; set; }
    }
}
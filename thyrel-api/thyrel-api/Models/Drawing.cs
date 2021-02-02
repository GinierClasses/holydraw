using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace thyrel_api.Models
{
    public class Drawing
    {
        public Drawing() { }

        public Drawing(int? id, int step, DateTime createdAt, int ownerId, Player ownerPlayer, int initiatorId, Player initiatorPlayer, int sessionId, Session session)
        {
            Id = id;
            Step = step;
            CreatedAt = createdAt;
            OwnerId = ownerId;
            OwnerPlayer = ownerPlayer;
            InitiatorId = initiatorId;
            InitiatorPlayer = initiatorPlayer;
            SessionId = sessionId;
            Session = session;
        }

        //TODO public string ImagePath { get; set; }
        public int? Id { get; set; }
        public int Step { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public int OwnerId { get; set; }
        public virtual Player OwnerPlayer { get; set; }

        public int InitiatorId { get; set; }
        public virtual Player InitiatorPlayer { get; set; }

        public int SessionId { get; set; }
        public virtual Session Session { get; set; }
    }
}

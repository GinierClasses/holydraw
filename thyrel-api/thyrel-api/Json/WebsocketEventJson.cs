using System;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace thyrel_api.Json
{
    public class PlayerIdWebsocketEventJson : BaseWebsocketEventJson
    {
        public PlayerIdWebsocketEventJson(WebsocketEvent websocketEvent, int? playerId) : base(websocketEvent)
        {
            PlayerId = playerId;
        }

        public int? PlayerId { get; }
    }

    public class SessionAlbumEventJson : BaseWebsocketEventJson
    {
        public SessionAlbumEventJson(int? albumInitiatorId, BookState bookState)
        {
            WebsocketEvent = WebsocketEvent.SessionUpdate;
            Session = new SessionAlbumSocketDto {AlbumInitiatorId = albumInitiatorId, BookState = bookState};
        }

        public SessionAlbumSocketDto Session { get; }
    }

    public class RoomReloadIdentifierEventJson : BaseWebsocketEventJson
    {
        public RoomReloadIdentifierEventJson(Room room)
        {
            WebsocketEvent = WebsocketEvent.ReloadIdentifier;
            Room = new RoomReloadIdentifierDto {Id = room.Id, Identifier = room.Identifier};
        }

        public RoomReloadIdentifierDto Room { get; }
    }

    public class ErrorWebsocketEventJson : BaseWebsocketEventJson
    {
        public ErrorWebsocketEventJson(string error)
        {
            WebsocketEvent = WebsocketEvent.Invalid;
            Error = error;
        }

        public string Error { get; }
    }

    public class PlayerWebsocketEventJson : BaseWebsocketEventJson
    {
        public PlayerWebsocketEventJson(WebsocketEvent websocketEvent, Player player) : base(websocketEvent)
        {
            Player = new PlayerDto(player);
        }

        public PlayerDto Player { get; }
    }

    public class SessionWebsocketEventJson : BaseWebsocketEventJson
    {
        public SessionWebsocketEventJson(WebsocketEvent websocketEvent, int step, SessionStepType stepType,
            DateTime? stepFinishAt, int timeDuration, int playerFinished, BookState bookState) : base(websocketEvent)
        {
            Session = new SessionSocketDto
            {
                ActualStep = step,
                StepFinishAt = stepFinishAt,
                TimeDuration = timeDuration,
                StepType = stepType,
                PlayerFinished = playerFinished,
                BookState = bookState
            };
        }

        public SessionSocketDto Session { get; }
    }


    public class RoomUpdateWebsocketEventJson : BaseWebsocketEventJson
    {
        public RoomSettingsDto Room;

        public RoomUpdateWebsocketEventJson(Room room)
        {
            Room = new RoomSettingsDto {Mode = room.Mode};
            WebsocketEvent = WebsocketEvent.RoomUpdate;
        }
    }

    public class AlbumWebsocketEventJson : BaseWebsocketEventJson
    {
        public ElementAlbumDto Album;

        public AlbumWebsocketEventJson(ElementAlbumDto album)
        {
            Album = album;
            WebsocketEvent = WebsocketEvent.NewAlbumElement;
        }
    }

    public class PlayerFinishStepWebsocketEventJson : BaseWebsocketEventJson
    {
        public PlayerFinishStepWebsocketEventJson(WebsocketEvent websocketEvent, int playerFinished) : base(
            websocketEvent)
        {
            Session = new PlayerFinishStepSocketDto
            {
                PlayerFinished = playerFinished
            };
        }

        public PlayerFinishStepSocketDto Session { get; }
    }

    public class EmojiReactionWebSocketEventJson : BaseWebsocketEventJson
    {
        public int ElementId;
        public EmojiReaction EmojiReaction;
        public int PlayerId;

        public EmojiReactionWebSocketEventJson(int playerId, int elementId, EmojiReaction emojiReaction)
        {
            PlayerId = playerId;
            ElementId = elementId;
            EmojiReaction = emojiReaction;
            WebsocketEvent = WebsocketEvent.NewReaction;
        }
    }

    public class RemovedEmojiReactionWebSocketEventJson : BaseWebsocketEventJson
    {
        public int ElementId;
        public int PlayerId;

        public RemovedEmojiReactionWebSocketEventJson(int playerId, int elementId)
        {
            PlayerId = playerId;
            ElementId = elementId;
            WebsocketEvent = WebsocketEvent.ReactionDeleted;
        }
    }
}
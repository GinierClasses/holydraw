namespace thyrel_api.Models
{
    public enum WebsocketEvent
    {
        /*
         * WebsocketEvent is event sent from server to user from a Room
         * Associated number must be like this :
         * -10 to -1 = internal event
         * 1 to 10 = room event
         * 11 to 20 = session event
         */
        Invalid = -1,
        PlayerJoin = 1,
        PlayerLeft = 2,
        PlayerFinished = 3,
        NewOwnerPlayer = 4,
        PlayerKicked = 5,
        Restart = 6,
        ReloadIdentifier = 7,
        SessionStart = 11,
        SessionUpdate = 12,
        NextStep = 13, // on a step is finish
        NewAlbumElement = 14,
        NewReaction = 15,
        ReactionDeleted = 16,
    }
}
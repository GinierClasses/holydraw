namespace thyrel_api.Models
{
    public enum BookState
    {
        Idle = 0, // when album page is not show
        Pending = 1, // when album page is show but the owner didn't start
        Started = 2, // when album is started
        Finished = 3 // when album is finished
    }
}
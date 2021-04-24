namespace thyrel_api.Models.DTO
{
    public class ElementAlbumDto
    {
        public ElementAlbumCreatorDto Creator;
        public ElementType Type;
        public string DrawImage;
        public string Text;
        public int Id;
        public int InitiatorId;
        public int Step;
        public int SessionId;
        public bool IsLastAlbum = false;
    }

    public class ElementAlbumCreatorDto
    {
        public string Username;
        public int Id;
        public string AvatarUrl;
    }
}
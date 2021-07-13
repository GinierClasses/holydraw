namespace thyrel_api.Models.DTO
{
    public class ElementAlbumDto
    {
        public ElementAlbumCreatorDto Creator;
        public string DrawImage;
        public int Id;
        public int InitiatorId;
        public bool IsLastAlbum = false;
        public int SessionId;
        public int Step;
        public string Text;
        public ElementType Type;
    }

    public class ElementAlbumCreatorDto
    {
        public string AvatarUrl;
        public int Id;
        public string Username;
    }
}
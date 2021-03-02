using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using thyrel_api.DataProvider;

namespace test_thyrel_api
{
    public class PlayerDataProviderTest : TestProvider
    {
        private IPlayerDataProvider _playerDataProvider;
        private ITokenDataProvider _tokenDataProvider;
        
        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _playerDataProvider = new PlayerDataProvider(Options);
            _tokenDataProvider = new TokenDataProvider(Options);
        }

        [Test]
        private async Task Add()
        {
            var playerCount = Context.Player.Count();
            var username = "Tintin";
            var avatarUrl = "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSn6vswIVDw48Lk4SLKU2jxQVzj1Dkfg9Ja_w69Sq-g8ylBQeo%26s&sp=1614708915Tfaf9667bd04707b2fff3708ccc338676bbc04a20241de1936f33fccb7f6d333c"
            var isOwner = true;
            var roomId = 1;
            var tokenId = 1;
            var newPlayer = await _playerDataProvider.Add(username, avatarUrl, isOwner, roomId, tokenId);
            Assert.AreEqual(playerCount + 1, Context.Player.Count());
        }

        [Test]
        private async Task GetPlayer()
        {
            var username = "Tintin";
            var avatarUrl = "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSn6vswIVDw48Lk4SLKU2jxQVzj1Dkfg9Ja_w69Sq-g8ylBQeo%26s&sp=1614708915Tfaf9667bd04707b2fff3708ccc338676bbc04a20241de1936f33fccb7f6d333c"
            var isOwner = true;
            var roomId = 1;
            var tokenId = 1;
            var newPlayer = await _playerDataProvider.Add(username, avatarUrl, isOwner, roomId, tokenId);
            Assert.AreEqual(newPlayer, _playerDataProvider.GetPlayer(newPlayer.Id));
        }

        [Test]
        private async Task GetPlayerByToken()
        {
            var username = "Tintin";
            var avatarUrl = "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSn6vswIVDw48Lk4SLKU2jxQVzj1Dkfg9Ja_w69Sq-g8ylBQeo%26s&sp=1614708915Tfaf9667bd04707b2fff3708ccc338676bbc04a20241de1936f33fccb7f6d333c"
            var isOwner = true;
            var roomId = 1;
            var tokenId = 1;
            var newPlayer = await _playerDataProvider.Add(username, avatarUrl, isOwner, roomId, tokenId);
            Assert.AreEqual(newPlayer, _playerDataProvider.GetPlayerByToken(newPlayer.Token.TokenKey));
        }

        [Test]
        private async Task TestDisable()
        {
            
        }

        // test player by room do not take player not connected and return correct players
        [Test]
        public async Task TestGetPlayersByRoom()
        {
            var roomId = 1;
            var playerNotConnected = Context.Player.First(p => p.RoomId == roomId);
            playerNotConnected.IsConnected = false;
            await Context.SaveChangesAsync();
            var players = await _playerDataProvider.GetPlayersByRoom(roomId);
            var firstPlayerRoomId = players.First().RoomId;
            Assert.AreEqual(firstPlayerRoomId, roomId);
            Assert.IsFalse(players.Any(p => p.Id == playerNotConnected.Id));
        }
        
        [Test]
        public async Task TestSetIsConnected()
        {
            var playerNotConnected = Context.Player.First(p => p.IsConnected);
            Assert.IsTrue(playerNotConnected.IsConnected);
            var playerConnected = await _playerDataProvider.SetIsConnected(playerNotConnected.Id, false);
            Assert.IsNotNull(playerConnected);
            var playerEdited = await _playerDataProvider.GetPlayer(playerNotConnected.Id);
            Assert.IsFalse(playerEdited.IsConnected);
        }
        
        [Test]
        public async Task TestSetIsPlaying()
        {
            var playerNotPlaying = Context.Player.First(p => !p.IsPlaying);
            Assert.IsFalse(playerNotPlaying.IsPlaying);
            var playerPlaying = await _playerDataProvider.SetIsPlaying(playerNotPlaying.Id, true);
            Assert.IsNotNull(playerPlaying);
            var playerEdited = await _playerDataProvider.GetPlayer(playerNotPlaying.Id);
            Assert.IsTrue(playerEdited.IsPlaying);
        }
    }
}
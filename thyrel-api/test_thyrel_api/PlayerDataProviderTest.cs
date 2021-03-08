using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using thyrel_api.DataProvider;

namespace test_thyrel_api
{
    public class PlayerDataProviderTest : TestProvider
    {
        private IPlayerDataProvider _playerDataProvider;
        
        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _playerDataProvider = new PlayerDataProvider(Options);
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

        [Test]
        public async Task TestKickPlayerFromRoomById()
        {
            var dbPlayer = Context.Player.First(p => p.RoomId != null);
            var kickedPlayer = await _playerDataProvider.KickPlayerFromRoomById(dbPlayer.Id);
            Assert.IsNull(kickedPlayer.RoomId);
        }
    }
}
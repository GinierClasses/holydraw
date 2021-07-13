using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class PlayerDataProviderTest : TestProvider
    {
        private IPlayerDataProvider _playerDataProvider;

        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _playerDataProvider = new PlayerDataProvider(Context);
        }

        [Test]
        public async Task Add()
        {
            var username = "Tinting";
            var avatarUrl = " ";
            var isOwner = true;
            var roomId = 1;
            var tokenId = 1;

            var playerCount = Context.Player.Count();
            await _playerDataProvider.Add(username, avatarUrl, isOwner, roomId, tokenId);
            Assert.AreEqual(playerCount + 1, Context.Player.Count());
        }

        [Test]
        public async Task GetPlayer()
        {
            var playerId = 1;
            var player = Context.Player.First(p => p.Id == playerId);

            var playerFromProvider = await _playerDataProvider.GetPlayer(player.Id);
            Assert.AreEqual(player.Id, playerFromProvider.Id);
            var playerNull = await _playerDataProvider.GetPlayer(-1);
            Assert.IsNull(playerNull);
        }

        [Test]
        public async Task GetPlayerByToken()
        {
            var playerId = 1;
            var player = Context.Player.First(p => p.Id == playerId);
            var token = new Token("xxxTokenKeyxxx");
            player.Token = token;
            await Context.SaveChangesAsync();

            var playerFromToken = await _playerDataProvider.GetPlayerByToken(token.TokenKey);
            Assert.AreEqual(player.Id, playerFromToken.Id);
        }

        [Test]
        public async Task TestDisableNotExistingPlayerShouldReturnNull()
        {
            Assert.IsNull(await _playerDataProvider.Disable(-1));
        }

        [Test]
        public async Task TestDisablePlayer()
        {
            var playerId = 1;
            var player = Context.Player.First(p => p.Id == playerId);
            var disabledPlayer = await _playerDataProvider.Disable(player.Id);
            Assert.IsNotNull(disabledPlayer.DisableAt);
        }

        [Test]
        public async Task TestSetOwnerOfNotExistingPlayerShouldReturnNull()
        {
            Assert.IsNull(await _playerDataProvider.SetOwner(null));
        }

        [Test]
        public async Task TestSetOwner()
        {
            var player = Context.Player.First(p => !p.IsOwner);

            var ownerPlayer = await _playerDataProvider.SetOwner(player);
            Assert.IsTrue(ownerPlayer.IsOwner);
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
            if (playerNotPlaying.RoomId != null)
                await _playerDataProvider.SetIsPlaying((int) playerNotPlaying.RoomId);
            var playerEdited = await _playerDataProvider.GetPlayer(playerNotPlaying.Id);
            Assert.IsTrue(playerEdited.IsPlaying);
        }

        [Test]
        public async Task TestSetIsPlayingFalse()
        {
            var playerNotPlaying = Context.Player.First(p => !p.IsPlaying);
            Assert.IsFalse(playerNotPlaying.IsPlaying);
            if (playerNotPlaying.RoomId != null)
                await _playerDataProvider.SetIsPlaying((int) playerNotPlaying.RoomId, false);
            var playerEdited = await _playerDataProvider.GetPlayer(playerNotPlaying.Id);
            Assert.IsFalse(playerEdited.IsPlaying);
        }

        [Test]
        public async Task TestKickPlayerFromRoom()
        {
            var dbPlayer = Context.Player.First(p => p.RoomId != null);
            var kickedPlayer = await _playerDataProvider.KickPlayerFromRoom(dbPlayer);
            Assert.IsNull(kickedPlayer.RoomId);
        }

        [Test]
        public async Task TestFindNewPlayer()
        {
            var roomId = 1;
            var prevOwner = Context.Player.FirstOrDefault(p => p.RoomId == roomId);
            var newOwner = await _playerDataProvider.FindNewOwner(1);
            Assert.IsTrue(newOwner.IsConnected);
            Assert.IsTrue(prevOwner != null && newOwner.Id != prevOwner.Id);
            Assert.IsTrue(newOwner.IsOwner);
            Assert.IsTrue(newOwner.RoomId == roomId);
        }
    }
}
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using thyrel_api.Controllers;
using thyrel_api.Handler;
using thyrel_api.Websocket;

namespace test_thyrel_api
{
    public class PlayerControllerTest : TestProvider
    {
        private PlayerController _playerController;
        [SetUp]
        public async Task Setup()
        {
            await SetupTest();

            var httpContext = new DefaultHttpContext();
            var controller = new PlayerController(new WebsocketHandler(new MockScopeFactory()), Context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext,
                }
            };
            _playerController = controller;
        }

        [Test]
        public async Task GetMeTest()
        {
            var player = Context.Player.First();
            await ConnectApi(_playerController.HttpContext, player);
            
            var actionResult = await _playerController.Get();
            Assert.AreEqual(player.Id, actionResult.Value.Id);
        }

        [Test]
        public async Task KickTest()
        {
            var room = Context.Room.First();
            var playerWhoWantToKick = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && p.IsOwner);
            var playerToBeKicked = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && !p.IsOwner);
            
            await ConnectApi(_playerController.HttpContext, playerWhoWantToKick);
            var actionResult = await _playerController.Kick(playerToBeKicked.Id);
            Assert.AreEqual(playerToBeKicked.Id, actionResult.Value.Id);
            var playerKicked = Context.Player.First(predicate => predicate.Id == actionResult.Value.Id);
            Assert.IsNull(playerKicked.RoomId);
        }

        [Test]
        public async Task PlayerNotOwnerCantKick()
        {
            var room = Context.Room.First();
            var playerKicker = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && !p.IsOwner);
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && !p.IsOwner);

            await ConnectApi(_playerController.HttpContext, playerKicker);
            var actionResult = await _playerController.Kick(player.Id);
            Assert.IsNull(actionResult.Value);
        }

        [Test]
        public async Task PlayerNotAuthenticatedCantKick()
        {
            var room = Context.Room.First();
            var playerNotAuthentified = Context.Player.FirstOrDefault(p => p.RoomId == room.Id);
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && !p.IsOwner);
            playerNotAuthentified.Token = null;

            await ConnectApi(_playerController.HttpContext, playerNotAuthentified);
            var actionResult = await _playerController.Kick(player.Id);
            Assert.IsNull(actionResult.Value);
        }

        [Test]
        public async Task CantKickPlayerOfOtherRoom()
        {
            var room = Context.Room.First();
            var playerWhoWantToKick = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && !p.IsOwner);
            var player = Context.Player.FirstOrDefault(p => p.RoomId != room.Id && !p.IsOwner);

            await ConnectApi(_playerController.HttpContext, playerWhoWantToKick);
            var actionResult = await _playerController.Kick(player.Id);
            Assert.IsNull(actionResult.Value);
        }
    }
}
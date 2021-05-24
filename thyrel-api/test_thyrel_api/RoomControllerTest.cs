using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using thyrel_api.Controllers;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;
using static thyrel_api.Controllers.RoomController;

namespace test_thyrel_api
{
    public class RoomControllerTest : TestProvider
    {
        private RoomController _roomController;

        [SetUp]
        public async Task Setup()
        {
            await SetupTest();

            var httpContext = new DefaultHttpContext();
            var controller = new RoomController(new WebsocketHandler(TestConfiguration), Context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext,
                }
            };
            _roomController = controller;
        }

        [Test]
        public async Task GetRoomWithId()
        {
            var room = Context.Room.First();
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id);
            await ConnectApi(_roomController.HttpContext, player);

            var actionResult = await _roomController.Get(room.Id);
            Assert.AreEqual(actionResult.Value.Id, room.Id);
        }

        [Test]
        public async Task GetPlayersByRoomAuthorize()
        {
            var room = Context.Room.First();
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id);
            await ConnectApi(_roomController.HttpContext, player);
            var playersExpected = Context.Player.Where(p => p.RoomId == room.Id && p.IsConnected).ToList();
            var actionResult = await _roomController.GetPlayersByRoom(room.Id);
            Assert.AreEqual(actionResult.Value.Count, playersExpected.Count);
        }

        [Test]
        public async Task GetPlayersByRoomUnAuthorize()
        {
            var room = Context.Room.First();

            var actionResult = await _roomController.GetPlayersByRoom(room.Id);
            // return null if player is not authorize
            Assert.IsNull(actionResult.Value);
        }

        [Test]
        public async Task JoinRoom()
        {
            // good for the future : move Body Class to BodyClass file class
            var body = new PlayerRoomBody();
            body.AvatarUrl = "3";
            body.Username = "playertest";
            var room = Context.Room.Last();

            await _roomController.Join(room.Identifier, body);

            var player = Context.Player.Last();
            var token = Context.Token.Last();

            Assert.AreEqual(player.Username, body.Username);
            Assert.AreEqual(player.AvatarUrl, body.AvatarUrl);
            Assert.AreEqual(player.TokenId, token.Id);
            Assert.AreEqual(player.RoomId, room.Id);
        }

        [Test]
        public async Task PostRoomTest()
        {
            var body = new PlayerRoomBody();
            body.AvatarUrl = "3";
            body.Username = "playertest";

            var nRooms = Context.Room.Count();
            await _roomController.Post(body);
            Assert.AreEqual(Context.Room.Count(), nRooms + 1);

            var player = Context.Player.Last();
            var token = Context.Token.Last();

            Assert.AreEqual(player.Username, body.Username);
            Assert.AreEqual(player.AvatarUrl, body.AvatarUrl);
            Assert.AreEqual(player.TokenId, token.Id);
        }

        [Test]
        public async Task RestartTest()
        {
            var room = Context.Room.First();
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id);
            await ConnectApi(_roomController.HttpContext, player);

            await _roomController.Restart();

            var playerRestarted = Context.Player.First(p => p.Id == player.Id);
            //assert the same player is not playing anymore
            Assert.IsFalse(playerRestarted.IsPlaying);

            var session = Context.Session.First(s => s.RoomId == room.Id);
            //assert the session of the room is finished
            Assert.IsNotNull(session.FinishAt);
        }
        
        [Test]
        public async Task ReloadTest()
        {
            var room = Context.Room.First();
            var prevIdentifier = room.Identifier;
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && p.IsOwner);
            await ConnectApi(_roomController.HttpContext, player);

            await _roomController.ReloadIdentifier();
            var newIdentifier = room.Identifier;
            
            Assert.AreNotEqual(prevIdentifier, newIdentifier);
        }
        
        [Test]
        public async Task ReloadTestWithUnOwnerAccount()
        {
            var room = Context.Room.First();
            var prevIdentifier = room.Identifier;
            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id && !p.IsOwner);
            await ConnectApi(_roomController.HttpContext, player);

            await _roomController.ReloadIdentifier();
            var newIdentifier = room.Identifier;
            
            Assert.AreEqual(prevIdentifier, newIdentifier);
        }

        [Test]
        public async Task PatchTest()
        {
            const RoomMode mode = RoomMode.OneWord;
            var room = Context.Room.First();

            Assert.AreNotEqual(mode, room.Mode);

            var player = Context.Player.FirstOrDefault(p => p.RoomId == room.Id);
            await ConnectApi(_roomController.HttpContext, player);

            await _roomController.Patch(room.Id, new RoomSettingsDto {Mode = mode});

            Assert.AreEqual(mode, room.Mode);
        }
    }
}
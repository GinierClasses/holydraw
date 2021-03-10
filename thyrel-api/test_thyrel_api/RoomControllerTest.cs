using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using thyrel_api.Controllers;

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
            var controller = new RoomController(Context)
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
    }
}
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using thyrel_api.Controllers;
using thyrel_api.DataProvider;
using thyrel_api.Websocket;

namespace test_thyrel_api
{
    public class SessionControllerTest : TestProvider
    {
        private SessionController _sessionController;

        [SetUp]
        public async Task Setup()
        {
            await SetupTest();

            var httpContext = new DefaultHttpContext();
            var controller = new SessionController(new WebsocketHandler(new MockScopeFactory()), Context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext,
                }
            };
            _sessionController = controller;
        }

        [Test]
        public async Task GetCurrentSessionTest()
        {
            var player = Context.Player.First();

            await ConnectApi(_sessionController.HttpContext, player);
            var actionResult = await _sessionController.GetCurrent();
            var expected = await new SessionDataProvider(Context).GetCurrentSessionByRoomId((int) player.RoomId);

            Assert.IsNotNull(player.RoomId);
            Assert.AreEqual(actionResult.Value.Id, expected.Id);
        }
    }
}
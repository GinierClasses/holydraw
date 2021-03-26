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
    public class ElementControllerTest : TestProvider
    {
        private ElementController _elementController;

        [SetUp]
        public async Task Setup()
        {
            await SetupTest();

            var httpContext = new DefaultHttpContext();
            var controller = new ElementController(new WebsocketHandler(new MockScopeFactory()), Context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext,
                }
            };
            _elementController = controller;
        }

        [Test]
        public async Task GetCurrentElementTest()
        {
            var player = Context.Player.First();

            await ConnectApi(_elementController.HttpContext, player);
            var actionResult = await _elementController.GetCurrent();
            var expected = await new ElementDataProvider(Context).GetCurrentElement(player.Id);

            Assert.IsNotNull(player.RoomId);
            Assert.AreEqual(actionResult.Value.Id, expected.Id);
        }
    }
}
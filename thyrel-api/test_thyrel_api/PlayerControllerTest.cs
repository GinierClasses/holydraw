using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using thyrel_api.Controllers;

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
            var controller = new PlayerController(Context)
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
            
            var actionResult = await _playerController.Post();
            Assert.AreEqual(player.Id, actionResult.Value.Id);
        }
    }
}
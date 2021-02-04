using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers.ModelsControllers;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;

        public TestController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        // GET: api/Test
        [HttpGet]
        public async IAsyncEnumerable<string> Get()
        {
            new TokenController().Add(1);
            await _websocketHandler.SendMessageToSockets("Je suis en fou rire", null);
            yield return "API is happy to see you";
        }
        
        // POST: api/Test
        [HttpPost]
        public IEnumerable<string> Post([FromBody] string value)
        {
            var isInt = int.TryParse(value, out var intValue);
            _websocketHandler.SendMessageToSockets("YOYO here", isInt ? intValue : null);
            return new[] { "Here is you're value", value};
        }
    }
}

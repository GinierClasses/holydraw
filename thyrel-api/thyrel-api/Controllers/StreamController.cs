using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[controller]")]
    public class StreamController : Controller
    {
        private readonly IWebsocketHandler _websocketHandler;

        public StreamController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

        // api/stream
        [HttpGet]
        public async Task Get()
        {
            var context = ControllerContext.HttpContext;
            var isSocketRequest = context.WebSockets.IsWebSocketRequest;

            if (isSocketRequest)
            {
                var websocket = await context.WebSockets.AcceptWebSocketAsync();

                await _websocketHandler.Handle(Guid.NewGuid(), websocket);
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        }
    }
}
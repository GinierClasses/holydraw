using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Models;
using thyrel_api.Websocket;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private IWebsocketHandler _websocketHandler;

        public SessionController(IWebsocketHandler websocketHandler)
        {
            _websocketHandler = websocketHandler;
        }

       
    }
}
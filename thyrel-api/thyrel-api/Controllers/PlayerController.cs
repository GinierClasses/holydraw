using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.DataProvider;
using thyrel_api.Handler;
using thyrel_api.Models;

namespace thyrel_api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly HolyDrawDbContext _context;

        public PlayerController(HolyDrawDbContext context)
        {
            _context = context;
        }

        // Call this endpoint to get own player
        // POST: api/players/me
        [HttpGet("me")]
        public async Task<ActionResult<Player>> Post()
        {
            var player = await AuthorizationHandler.CheckAuthorization(HttpContext, _context);
            if (player == null) return Unauthorized();
            return await new PlayerDataProvider(_context).GetPlayer(player.Id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers.ModelsControllers;
using thyrel_api.Models;

namespace thyrel_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TestController : ControllerBase
  {
    public TestController()
    {
    }
    // GET: api/Test
    [HttpGet]
    public async Task<ActionResult<Player>> Get()
    {
      new TokenController().Add(1);
      HolyDrawDbContext holyDrawDbContext = new HolyDrawDbContext();
      var player = holyDrawDbContext.Player.OrderBy(b => b.CreatedAt).Last();
      return player;
    }

    // POST: api/Test
    [HttpPost]
    public IEnumerable<string> Post([FromBody] string value)
    {
      return new[] { "Here is you're value", value };
    }
  }
}

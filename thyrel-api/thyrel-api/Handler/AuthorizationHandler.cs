using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace thyrel_api.Handler
{
    public static class AuthorizationHandler
    {
        /// <summary>
        ///     Usage in your controller :
        ///     var player = await AuthorizationHandler.CheckAuthorization(HttpContext);
        ///     if (player == null) return Unauthorized();
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns>Player or Null</returns>
        public static async Task<Player> CheckAuthorization(HttpContext httpContext, HolyDrawDbContext context)
        {
            // get the authorization header
            string authHeader = httpContext.Request.Headers["Authorization"];
            // check header is valid
            if (authHeader == null || !authHeader.StartsWith("Bearer"))
                return null;
            // get the token
            var playerToken = authHeader.Substring("Bearer ".Length).Trim();
            // use the PlayerDataProvider to get the Player with this Token (func : `GetPlayerByToken`)
            var player = await new PlayerDataProvider(context).GetPlayerByToken(playerToken);
            return player;
        }
    }
}
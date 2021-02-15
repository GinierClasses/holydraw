using System;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using thyrel_api.Controllers;
using thyrel_api.Models;
using System.Web;


namespace thyrel_api.Handler
{ 
    public class AuthorizationHandler : ControllerBase
    {
        public AuthorizationHandler()
        {

        }

        public Player CheckAuthorization(HttpContext httpContext)
        {
            // get the authorization header
            string authHeader = httpContext.Request.Headers["Authorization"];
            // check header is valid
            if (authHeader == null && !authHeader.StartsWith("Bearer"))
            {
                //Handle what happens if that isn't the case
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }
            // get the token
            string playerToken = authHeader.Substring("Bearer ".Length).Trim();
            // use the PlayerDataProvider to get the Player with this Token (func : `GetPlayerByToken`)
            var player = new PlayerDataProvider().GetPlayerByToken(playerToken);
            if (player == null)
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            return player;
        }
    }

    public class HttpResponseException : Exception
    {
        public HttpResponseException(HttpStatusCode unauthorized)
        {
            throw new NotImplementedException();
        }
    }
}
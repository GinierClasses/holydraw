using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class TestProvider
    {
        protected readonly IConfiguration TestConfiguration = new ConfigurationRoot(new List<IConfigurationProvider>());
        protected DbContextOptions<HolyDrawDbContext> Options { get; private set; }
        protected HolyDrawDbContext Context { get; private set; }


        protected async Task SetupTest()
        {
            var options = new DbContextOptionsBuilder<HolyDrawDbContext>()
                .UseInMemoryDatabase("thyrel_db")
                .Options;

            Options = options;

            var mock = new MockDatabase(options);
            await mock.AddMockData();
            Context = mock.Context;
        }

        protected async Task ConnectApi(HttpContext httpContext, Player player)
        {
            var newToken = new Token("temp_connect_key");
            await Context.Token.AddAsync(newToken);
            await Context.SaveChangesAsync();
            player.TokenId = newToken.Id;
            await Context.SaveChangesAsync();
            httpContext.Request.Headers["Authorization"] = $"Bearer {newToken.TokenKey}";
        }
    }
}
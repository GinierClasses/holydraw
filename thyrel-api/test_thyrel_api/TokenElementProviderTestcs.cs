using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class TokenElementProviderTest
    {
        private ITokenDataProvider _tokenDataProvider;
        private HolyDrawDbContext _context;

        [SetUp]
        public async Task Setup()
        {
            var options = new DbContextOptionsBuilder<HolyDrawDbContext>()
                .UseInMemoryDatabase("thyrel_db")
                .Options;

            _tokenDataProvider = new TokenDataProvider(options);

            var mock = new MockDatabase(options);
            await mock.AddMockData();
            _context = mock.Context;
        }

        [Test]
        public async Task AddSentenceFunctionCreateSentence()
        {
            var elementCount = _context.Token.Count();
            await _tokenDataProvider.Add();
            Assert.AreEqual(elementCount + 1, _context.Token.Count());
        }

        [Test]
        public async Task DiscardTokenEditColumn()
        {
            var tokenNotDiscord = await _context.Token.FirstAsync(t => t.DiscardAt == null);
            var updatedElement = await _tokenDataProvider.Discard(tokenNotDiscord.Id);
            var tokenNotDiscordUpdate = await _tokenDataProvider.GetToken(tokenNotDiscord.Id);
            Assert.IsNotNull(tokenNotDiscordUpdate.DiscardAt);
            Assert.IsNotNull(updatedElement.DiscardAt);
        }
        
        [Test]
        public async Task GetTokenTest()
        {
            const int id = 1;
            var token1 = await _tokenDataProvider.GetToken(id);
            Assert.AreEqual(1, token1.Id);
        }
        
        [Test]
        public async Task FindPlayerReturnAssociatedPlayer()
        {
            var testedToken = await _tokenDataProvider.GetToken(4);
            var player = await _tokenDataProvider.FindPlayer(testedToken.TokenKey);
            Assert.AreEqual(testedToken.Id, player.TokenId);
        }
    }
}
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;

namespace test_thyrel_api
{
    public class SessionDataProviderTest : TestProvider
    {
        private ISessionDataProvider _sessionDataProvider;
        
        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _sessionDataProvider = new SessionDataProvider(Options);
        }
        
        [Test]
        public async Task AddSessionTest()
        {
            var sessionCount = Context.Session.Count();
            await _sessionDataProvider.Add(1);
            Assert.AreEqual(sessionCount + 1, Context.Session.Count());
        }
        
        [Test]
        public async Task FinishSessionTest()
        {
            var session = await Context.Session.FirstAsync(s => s.FinishAt == null);
            await _sessionDataProvider.Finish(session.Id);
            var sessionEdited = await _sessionDataProvider.GetSessionById(session.Id);
            Assert.IsNotNull(sessionEdited.FinishAt);
        }
        
        [Test]
        public async Task GetSessionByIdTest()
        {
            var session = await Context.Session.FirstAsync();
            var sessionByProvider = await _sessionDataProvider.GetSessionById(session.Id);
            Assert.AreEqual(session.Id, sessionByProvider.Id);

            var sessionNull = await _sessionDataProvider.GetSessionById(-2);
            Assert.IsNull(sessionNull);            
        }
    }
}

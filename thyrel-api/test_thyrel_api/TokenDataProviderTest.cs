using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class TokenDataProviderTest
    {
        private IElementDataProvider _elementDataProvider;
        private HolyDrawDbContext _context;

        [SetUp]
        public async Task Setup()
        {

            var options = new DbContextOptionsBuilder<HolyDrawDbContext>()
                .UseInMemoryDatabase("thyrel_db")
                .Options;

            _elementDataProvider = new ElementDataProvider(options);
            await AddMockData();
        }
        
        [TearDown]
        public async Task TearDown()
        {
        }

        [Test]
        public async Task AddSentenceFunctionCreateSentence()
        {
            var newElement = await _elementDataProvider.AddSentence(1, 2, 2, 1, "Test2");
            Assert.IsNotNull(newElement);
            Assert.AreEqual(ElementType.Sentence, newElement.Type);
            Assert.AreEqual(1, newElement.CreatorId);
        }

        [Test]
        public async Task AddDrawingFunctionCreateSentence()
        {
            var newElement = await _elementDataProvider.AddDrawing(1, 2, 2, 1, 1);
            Assert.IsNotNull(newElement);
            Assert.AreEqual(ElementType.Drawing, newElement.Type);
            Assert.AreEqual(1, newElement.CreatorId);
        }

        [Test]
        public async Task SetSentenceEditValueOfText()
        {
            const string newText = "yoyo";
            var newElement = await _elementDataProvider.SetSentence(1, newText);
            Assert.AreEqual(newText, newElement.Text);
            var dbElement = await _elementDataProvider.GetElement(1);
            Assert.AreEqual(newText, dbElement.Text);
        }

        [Test]
        public async Task SetDrawingEditValueOfDrawingId()
        {
            const int newId = 2;
            var newElement = await _elementDataProvider.SetDrawing(1, newId);
            Assert.AreEqual(newId, newElement.DrawingId);
            var dbElement = await _elementDataProvider.GetElement(1);
            Assert.AreEqual(newId, dbElement.DrawingId);
        }

        private async Task AddMockData()
        {
            var options = new DbContextOptionsBuilder<HolyDrawDbContext>()
                .UseInMemoryDatabase("thyrel_db")
                .Options;
            var context = new HolyDrawDbContext(options);
            _context = context;
            var roomEntity = await context.Room.AddAsync(new Room("Jean", null));
            var tokenEntity = await context.Token.AddAsync(new Token("player-key"));
            var tokenEntity2 = await context.Token.AddAsync(new Token("player-key"));
            var player1 = await context.Player.AddAsync(
                new Player("TestUserOwner", "TestAvatar", true, null,
                    roomEntity.Entity.Id, tokenEntity.Entity.Id));
            var player2 = await context.Player.AddAsync(
                new Player("TestUser", "TestAvatar2", false, null,
                    roomEntity.Entity.Id, tokenEntity2.Entity.Id));
            var session = await context.Session.AddAsync(new Session(null, roomEntity.Entity.Id));
            var element = await context.Element.AddAsync(new Element(1, player1.Entity.Id,
                player1.Entity.Id, session.Entity.Id, "hello sentence"));
            await context.SaveChangesAsync();
        }
    }
}
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;

namespace test_thyrel_api
{
    public class RoomDataProviderTest : TestProvider
    {
        private IRoomDataProvider _roomDataProvider;
        
        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _roomDataProvider = new RoomDataProvider(Context);
        }

        [Test]
        public async Task AddRoomTest()
        {
            var roomCount = Context.Room.Count();
            await _roomDataProvider.Add();
            Assert.AreEqual(roomCount + 1, Context.Room.Count());

        }

        [Test]
        public async Task GetRoomByIdTest()
        {
            var room = await Context.Room.FirstAsync();
            var roomByProvider = await _roomDataProvider.GetRoom(room.Id);
            Assert.AreEqual(room.Id, roomByProvider.Id);

            var roomNull = await _roomDataProvider.GetRoom(-2);
            Assert.IsNull(roomNull);            
        }
        
        [Test]
        public async Task GetRoomByIdentifierTest()
        {
            var room = await Context.Room.FirstAsync();
            var roomByProvider = await _roomDataProvider.GetRoom(room.Identifier);
            Assert.AreEqual(room.Identifier, roomByProvider.Identifier);

            var roomNull = await _roomDataProvider.GetRoom("efiwefhiofewiho");
            Assert.IsNull(roomNull);            
        }

        [Test]
        public async Task EndRoomTest()
        {
            var room = await Context.Room.FirstAsync(r => r.FinishAt == null);
            await _roomDataProvider.Finish(room.Id);
            var roomEdited = await _roomDataProvider.GetRoom(room.Id);
            Assert.IsNotNull(roomEdited.FinishAt);
        }
    }
}
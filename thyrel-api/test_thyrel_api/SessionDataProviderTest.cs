using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class SessionDataProviderTest : TestProvider
    {
        private ISessionDataProvider _sessionDataProvider;
        private IPlayerDataProvider _playerDataProvider;

        [SetUp]
        public async Task Setup()
        {
            await SetupTest();
            _sessionDataProvider = new SessionDataProvider(Context);
            _playerDataProvider = new PlayerDataProvider(Context);
        }

        [Test]
        public async Task AddSessionTest()
        {
            var lastRoom = await Context.Room.LastAsync();
            var sessionCount = Context.Session.Count();
            await _sessionDataProvider.Add(lastRoom.Id, DateTime.Now.AddMinutes(1), 10, 3);
            Assert.AreEqual(sessionCount + 1, Context.Session.Count());
        }

        [Test]
        public async Task AddSessionTestWhenSessionAlreadyExist()
        {
            var lastRoom = await Context.Room.FirstAsync();
            var sessionCount = Context.Session.Count();
            await _sessionDataProvider.Add(lastRoom.Id, DateTime.Now.AddMinutes(1), 10, 3);
            Assert.AreEqual(sessionCount, Context.Session.Count());
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

        [Test]
        public async Task GetCurrentSessionByRoomIdTest()
        {
            var room = await Context.Room.FirstAsync();
            var expected = await Context.Session
                .OrderBy(s => s.CreatedAt)
                .LastOrDefaultAsync(s => s.RoomId == room.Id && s.FinishAt == null);
            var session = await _sessionDataProvider.GetCurrentSessionByRoomId(room.Id);
            Assert.AreEqual(expected.Id, session.Id);
        }

        [Test]
        public async Task GetIfStepFinishedTest()
        {
            var session = await Context.Session.FirstAsync();

            var playersCount = await Context.Player
                .Where(p => p.RoomId == session.RoomId && p.IsPlaying).CountAsync();
            session.TotalPlayers = playersCount;
            await Context.SaveChangesAsync();

            var elementsCount = await Context.Element
                .Where(e => e.SessionId == session.Id && e.Step == session.ActualStep && e.FinishAt != null).CountAsync();

            var result = await _sessionDataProvider.GetPlayerStatus(session);

            Assert.AreEqual(result.PlayerCount, playersCount);
            Assert.AreEqual(result.PlayerFinished, elementsCount);

        }

        [Test]
        public async Task RunStartSession()
        {
            var room = await Context.Room.LastAsync();
            var expectedElementCount = Context.Element.Count() + (await _playerDataProvider.GetPlayersByRoom(room.Id)).Count;
            var sessionsCount = Context.Session.Count();

            await _sessionDataProvider.StartSession(room.Id);

            Assert.AreEqual(expectedElementCount, Context.Element.Count());
            Assert.AreEqual(sessionsCount + 1, Context.Session.Count());
        }

        [Test]
        public async Task RunNextStepSessionTest()
        {
            var session = await Context.Session.FirstAsync();
            session.StepType = SessionStepType.Write;
            await Context.SaveChangesAsync();
            var sessionStep = session.ActualStep;
            var elementsCount = Context.Element.Count(e => e.SessionId == session.Id);
            await _sessionDataProvider.NextStep(session);
            Assert.AreEqual(elementsCount + Context.Player
                    .Count(p => p.RoomId == session.RoomId && p.IsPlaying),
                Context.Element.Count(e => e.SessionId == session.Id));
            var editedSession = await Context.Session.FindAsync(session.Id);
            Assert.AreEqual(sessionStep + 1, editedSession.ActualStep);
            Assert.AreEqual(session.StepType, SessionStepType.Draw);

        }
        
        [Test]
        public async Task RunNextStepSessionTestOnLastStep()
        {
            var session = await Context.Session.FirstAsync();
            var players = Context.Player
                .Where(p => p.RoomId == session.RoomId && p.IsPlaying).ToList();
            session.ActualStep = players.Count;
            await Context.SaveChangesAsync();
            
            var sessionStep = session.ActualStep;
            var elementsCount = Context.Element.Count(e => e.SessionId == session.Id);
            await _sessionDataProvider.NextStep(session);
            Assert.AreEqual(elementsCount,
                Context.Element.Count(e => e.SessionId == session.Id));
            var editedSession = await Context.Session.FindAsync(session.Id);
            Assert.AreEqual(sessionStep + 1, editedSession.ActualStep);
            Assert.AreEqual(session.StepType, SessionStepType.Book);
        }

        [Test]
        public async Task GetNextCandidatesElementsNormal()
        {
            var session = await Context.Session.FirstAsync();
            await new PlayerDataProvider(Context).SetIsPlaying(session.RoomId);
            var players = Context.Player
                .Where(p => p.RoomId == session.RoomId && p.IsPlaying).ToList();
            var elements = await new ElementDataProvider(Context).GetNextCandidateElements(session.Id);
            var elementsCreated = _sessionDataProvider.GetNextCandidatesElements(players, elements, session.ActualStep + 1, session.Id, ElementType.Drawing);
            Assert.AreEqual(elementsCreated.Count, players.Count);
            Assert.AreEqual(elementsCreated.First().Type, ElementType.Drawing);
            Assert.AreEqual(elementsCreated.First().Step, session.ActualStep + 1);
            Assert.AreEqual(elementsCreated.First().SessionId, session.Id);
            var isAnySameCreatorAndInitiator = elementsCreated.Any(e => e.InitiatorId == e.CreatorId);
            Assert.IsFalse(isAnySameCreatorAndInitiator);
        }
    }
}
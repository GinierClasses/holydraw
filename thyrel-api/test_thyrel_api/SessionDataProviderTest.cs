using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.DataProvider;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace test_thyrel_api
{
    public class SessionDataProviderTest : TestProvider
    {
        private IPlayerDataProvider _playerDataProvider;
        private ISessionDataProvider _sessionDataProvider;

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
            await _sessionDataProvider.Add(lastRoom.Id, DateTime.Now.AddMinutes(1), 10, 3,
                new RoomSettingsDto {Mode = RoomMode.Standard});
            Assert.AreEqual(sessionCount + 1, Context.Session.Count());
        }

        [Test]
        public async Task AddSessionTestWhenSessionAlreadyExist()
        {
            var lastRoom = await Context.Room.FirstAsync();
            var sessionCount = Context.Session.Count();
            await _sessionDataProvider.Add(lastRoom.Id, DateTime.Now.AddMinutes(1), 10, 3,
                new RoomSettingsDto {Mode = RoomMode.Standard});
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
                .Where(e => e.SessionId == session.Id && e.Step == session.ActualStep && e.FinishAt != null)
                .CountAsync();

            var result = await _sessionDataProvider.GetPlayerStatus(session);

            Assert.AreEqual(result.PlayerCount, playersCount);
            Assert.AreEqual(result.PlayerFinished, elementsCount);
        }

        [Test]
        public async Task RunStartSession()
        {
            var room = await Context.Room.LastAsync();
            var expectedElementCount =
                Context.Element.Count() + (await _playerDataProvider.GetPlayersByRoom(room.Id)).Count;
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
            await new PlayerDataProvider(Context).SetIsPlaying(session.RoomId);
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
            await _playerDataProvider.SetIsPlaying(session.RoomId);
            var players = Context.Player
                .Where(p => p.RoomId == session.RoomId && p.IsPlaying).ToList();
            var elements = await new ElementDataProvider(Context).GetNextCandidateElements(session.Id);
            var elementsCreated = _sessionDataProvider.GetNextCandidatesElements(players, elements,
                session.ActualStep + 1, session.Id, ElementType.Drawing);
            Assert.AreEqual(elementsCreated.Count, players.Count);
            Assert.AreEqual(elementsCreated.First().Type, ElementType.Drawing);
            Assert.AreEqual(elementsCreated.First().Step, session.ActualStep + 1);
            Assert.AreEqual(elementsCreated.First().SessionId, session.Id);
            var isAnySameCreatorAndInitiator = elementsCreated.Any(e => e.InitiatorId == e.CreatorId);
            Assert.IsFalse(isAnySameCreatorAndInitiator);
        }

        [Test]
        public async Task GetNextAlbum()
        {
            var session = await Context.Session.FirstAsync();
            Assert.IsNull(session.AlbumInitiatorId);

            var creatorsId = await Context.Element
                .Where(e => e.SessionId == session.Id && e.Step == 1)
                .OrderBy(e => e.CreatorId)
                .Select(e => e.CreatorId)
                .ToListAsync();

            // try the current album id for each possibilities
            foreach (var creatorId in creatorsId)
            {
                var updatedSession = await _sessionDataProvider.NextAlbum(session.RoomId);
                Assert.AreEqual(creatorId, updatedSession.AlbumInitiatorId);
            }

            // try to update Session but it's was the last creator
            var updatedSession2 = await _sessionDataProvider.NextAlbum(session.RoomId);
            Assert.AreEqual(null, updatedSession2);
        }

        [Test]
        public async Task GetCurrentPlayersInSessionTest()
        {
            const int roomId = 1;
            var noPlayingPlayers = await _sessionDataProvider.GetCurrentPlayersInSession(roomId);
            Assert.IsEmpty(noPlayingPlayers);

            await _playerDataProvider.SetIsPlaying(roomId);
            var playersBefore = await _sessionDataProvider.GetCurrentPlayersInSession(roomId);

            var notPlayingPlayer = Context.Player.First(p => p.RoomId == roomId);
            notPlayingPlayer.IsPlaying = false;
            await Context.SaveChangesAsync();

            var playersAfter = await _sessionDataProvider.GetCurrentPlayersInSession(roomId);

            Assert.AreEqual(playersBefore.Count - 1, playersAfter.Count);

            var count = Context.Player.Count(p => p.RoomId == roomId && p.IsPlaying);
            Assert.AreEqual(count, playersAfter.Count);
        }

        [Test]
        public async Task AlbumRecoveryTest()
        {
            const int roomId = 1;
            var session = Context.Session.First(s => s.RoomId == roomId);

            session.BookState = BookState.Idle;
            await Context.SaveChangesAsync();
            var emptyRecovery = await _sessionDataProvider.AlbumRecovery(roomId);
            Assert.IsEmpty(emptyRecovery);

            session.BookState = BookState.Pending;
            await Context.SaveChangesAsync();
            var emptyRecovery2 = await _sessionDataProvider.AlbumRecovery(roomId);
            Assert.IsEmpty(emptyRecovery2);

            session.BookState = BookState.Started;
            var players = Context.Player.Where(s => s.RoomId == roomId).ToList();
            session.AlbumInitiatorId = players[1].Id;
            await Context.SaveChangesAsync();
            var recovery = await _sessionDataProvider.AlbumRecovery(roomId);

            var expected =
                Context.Element.Count(e => e.InitiatorId <= session.AlbumInitiatorId && e.SessionId == session.Id);

            Assert.AreEqual(expected, recovery.Count);
        }
    }
}
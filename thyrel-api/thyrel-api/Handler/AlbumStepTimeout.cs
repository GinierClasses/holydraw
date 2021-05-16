using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using thyrel_api.DataProvider;
using thyrel_api.Json;
using thyrel_api.Models;
using thyrel_api.Models.DTO;
using thyrel_api.Websocket;

namespace thyrel_api.Handler
{
    public class AlbumStepTimeout
    {
        private readonly int _albumInitiatorId;
        private readonly int _sessionId;
        private readonly string _connectionString;
        private readonly int _step;
        private readonly IWebsocketHandler _websocketHandler;

        public AlbumStepTimeout(int albumInitiatorId, int sessionId, DbContext context, int step,
            IWebsocketHandler websocketHandler)
        {
            _connectionString = context.Database.GetConnectionString();
            _sessionId = sessionId;
            _albumInitiatorId = albumInitiatorId;
            _step = step;
            _websocketHandler = websocketHandler;
        }

        /// <summary>
        ///     Run timeout of delay. At end, is Session step is not already finish this will be automatically finish 
        /// </summary>
        /// <param name="delay"></param>
        public void RunTimeout(int delay)
        {
            Task.Delay(delay * 1000).ContinueWith(async _ =>
            {
                var context = GetContext();
                var sessionProvider = new SessionDataProvider(context);
                var session = await sessionProvider.GetSessionById(_sessionId);
                // test if step is already finish
                if (session.AlbumInitiatorId != _albumInitiatorId) return;
                var album = await context.Element
                    .Include(e => e.Creator)
                    .Select(e => new ElementAlbumDto
                    {
                        Creator = new ElementAlbumCreatorDto
                        {
                            Id = e.Creator.Id,
                            Username = e.Creator.Username,
                            AvatarUrl = e.Creator.AvatarUrl,
                        },
                        Type = e.Type,
                        DrawImage = e.DrawImage,
                        Text = e.Text,
                        Id = e.Id,
                        InitiatorId = e.InitiatorId,
                        Step = e.Step,
                        SessionId = e.SessionId
                    }).SingleOrDefaultAsync(e =>
                        e.InitiatorId == _albumInitiatorId &&
                        e.Step == _step &&
                        e.SessionId == _sessionId);

                var isFinish = session.TotalPlayers == album.Step;
                album.IsLastAlbum = isFinish;
                
                await _websocketHandler.SendMessageToSockets(
                    JsonBase.Serialize(
                        new AlbumWebsocketEventJson(album)), session.RoomId);

                if (!isFinish)
                    new AlbumStepTimeout(_albumInitiatorId, _sessionId, context, _step + 1, _websocketHandler)
                        .RunTimeout(3);

                await context.DisposeAsync();
            });
        }

        /// <summary>
        ///     Create the context with the connection string
        /// </summary>
        /// <returns>The context created</returns>
        private HolyDrawDbContext GetContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<HolyDrawDbContext>();
            optionsBuilder.UseMySql(
                _connectionString,
                new MySqlServerVersion(new Version(8, 0, 23)),
                mySqlOptions => mySqlOptions
                    .CharSetBehavior(CharSetBehavior.NeverAppend));
            return new HolyDrawDbContext(optionsBuilder.Options);
        }
    }
}
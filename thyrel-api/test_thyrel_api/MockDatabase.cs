using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;
using thyrel_api.Models.DTO;

namespace test_thyrel_api
{
    public class MockDatabase
    {
        public readonly HolyDrawDbContext Context;

        public MockDatabase(DbContextOptions<HolyDrawDbContext> options)
        {
            var context = new HolyDrawDbContext(options);
            Context = context;
        }

        public async Task AddMockData()
        {
            await Context.Database.EnsureDeletedAsync();

            await CreateRoom();
            await CreateToken();
            await CreatePlayer();
            await CreateSession();
            await CreateElements();
            await Context.SaveChangesAsync();
        }

        private async Task CreateElements()
        {
            var elements = new List<Element>
            {
                new(1, 1, 1, 1, ElementType.Sentence),
                new(2, 2, 1, 1, ElementType.Sentence),
                new(1, 2, 2, 1, ElementType.Sentence),
                new(1, 3, 3, 1, ElementType.Sentence),
                new(1, 4, 4, 1, ElementType.Sentence),
                new(1, 6, 6, 1, ElementType.Sentence),
                new(1, 7, 7, 1, ElementType.Sentence)
            };

            await Context.Element.AddRangeAsync(elements);
        }


        private async Task CreateSession()
        {
            var sessions = new List<Session>
            {
                new(1, DateTime.Now, 100, SessionStepType.Book, 3, new RoomSettingsDto {Mode = RoomMode.Standard}),
                new(2, DateTime.Now, 100, SessionStepType.Draw, 3, new RoomSettingsDto {Mode = RoomMode.Standard})
            };

            await Context.Session.AddRangeAsync(sessions);
        }


        private async Task CreatePlayer()
        {
            var players = new List<Player>
            {
                new("player-1-owner", "player-1-avatarurl", true, 1, 1),
                new("player-2-owner", "player-1-avatarurl", false, 1, 2),
                new("player-3-owner", "player-1-avatarurl", false, 1, 3),
                new("player-4-owner", "player-1-avatarurl", false, 1, 4),
                new("player-5-owner", "player-1-avatarurl", false, 1, 5),
                new("player-6-owner", "player-1-avatarurl", true, 2, 6),
                new("player-7-owner", "player-1-avatarurl", false, 2, 7),
                new("player-8-owner", "player-1-avatarurl", false, 2, 8),
                new("player-9-owner", "player-1-avatarurl", true, 3, 9)
            };

            await Context.Player.AddRangeAsync(players);
        }

        private async Task CreateToken()
        {
            var tokens = new List<Token>
            {
                new("token-1-key"),
                new("token-2-key"),
                new("token-3-key"),
                new("token-4-key"),
                new("token-5-key"),
                new("token-6-key"),
                new("token-7-key"),
                new("token-8-key"),
                new("token-9-key"),
                new("token-10-key")
            };

            await Context.Token.AddRangeAsync(tokens);
        }

        private async Task CreateRoom()
        {
            var rooms = new List<Room>
            {
                new("room-1-id"),
                new("room-2-id"),
                new("room-3-id"),
                new("room-4-id")
            };

            await Context.Room.AddRangeAsync(rooms);
        }
    }
}
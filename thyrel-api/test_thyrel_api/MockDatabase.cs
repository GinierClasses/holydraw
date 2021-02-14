using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class MockDatabase
    {
        public HolyDrawDbContext Context;

        public MockDatabase(DbContextOptions<HolyDrawDbContext> options)
        {
            var context = new HolyDrawDbContext(options);
            Context = context;
        }

        public async Task AddMockData()
        {
            if (Context.Player.Any())
                return;
            
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
                new Element(1, 1, 1, 1, "element-sentence-1"),
                new Element(1, 2, 2, 1, "element-sentence-2"),
                new Element(1, 3, 3, 1, "element-sentence-3"),
                new Element(1, 4, 4, 1, "element-sentence-4"),
                new Element(1, 6, 6, 1, "element-sentence-5"),
                new Element(1, 7, 7, 1, "element-sentence-6"),
            };
            
            await Context.Element.AddRangeAsync(elements);
        }


        private async Task CreateSession()
        {
            var sessions = new List<Session>
            {
                new(null, 1),
                new(null, 2),
            };
            
            await Context.Session.AddRangeAsync(sessions);
        }


        private async Task CreatePlayer()
        {
            var players = new List<Player>
            {
                new("player-1-owner", "player-1-avatarurl", true, null, 1, 1),
                new("player-2-owner", "player-1-avatarurl", false, null, 1, 2),
                new("player-3-owner", "player-1-avatarurl", false, null, 1, 3),
                new("player-4-owner", "player-1-avatarurl", false, null, 1, 4),
                new("player-5-owner", "player-1-avatarurl", false, null, 1, 5),
                new("player-6-owner", "player-1-avatarurl", true, null, 2, 6),
                new("player-7-owner", "player-1-avatarurl", false, null, 2, 7),
                new("player-8-owner", "player-1-avatarurl", false, null, 2, 8),
                new("player-9-owner", "player-1-avatarurl", true, null, 3, 9),
            };

            await Context.Player.AddRangeAsync(players);
        } 

        private async Task CreateToken()
        {
            var tokens = new List<Token>
            {
                new Token("token-1-key"),
                new Token("token-2-key"),
                new Token("token-3-key"),
                new Token("token-4-key"),
                new Token("token-5-key"),
                new Token("token-6-key"),
                new Token("token-7-key"),
                new Token("token-8-key"),
                new Token("token-9-key"),
                new Token("token-10-key"),
            };
            
            await Context.Token.AddRangeAsync(tokens);
        }

        private async Task CreateRoom()
        {
            var rooms = new List<Room>
            {
                new Room("room-1-id", null),
                new Room("room-2-id", null),
                new Room("room-3-id", null),
                new Room("room-4-id", null),
            };

            await Context.Room.AddRangeAsync(rooms);
        }
    }
}
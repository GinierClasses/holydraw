using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class TokenDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public TokenDataProvider()
        {
            _holyDrawDbContext = new HolyDrawDbContext();
        }

        /// <summary>
        /// Create a new Token autogenerate
        /// </summary>
        public Token Add()
        {
            const string allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz-.";
            var random = new Random();
            var resultToken = new string(
                Enumerable.Repeat(allChar, 16)
                    .Select(token => token[random.Next(token.Length)]).ToArray());

            var entry = _holyDrawDbContext.Token.Add(new Token(null, resultToken));
            SaveChanges();

            return entry.Entity;
        }

        /// <summary>
        /// To discord a token
        /// </summary>
        /// <param name="token">Token to discard</param>
        public void Discard(Token token)
        {
            var dbToken = _holyDrawDbContext.Token.SingleOrDefault(c => c.Id == token.Id);
            if (dbToken == null)
                return;
            token.DiscardAt = DateTime.Now;
            try
            {
                _holyDrawDbContext.Token.Attach(token);
                _holyDrawDbContext.Entry(dbToken).State = EntityState.Modified;
                SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        /// <summary>
        /// To find Player associated with the key
        /// </summary>
        /// <param name="key">the token key</param>
        /// <returns>Return the Player with associated key if player exist or null</returns>
        public Player FindPlayer(string key)
        {
            var token = _holyDrawDbContext.Token
                .Where(t => t.TokenKey == key && t.DiscardAt != null);
            return token.Last()?.Players.First();
        }

        private void SaveChanges()
        {
            _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
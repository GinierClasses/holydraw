using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using thyrel_api.Models;

namespace thyrel_api.DataProvider
{
    public class TokenDataProvider : ITokenDataProvider
    {
        private readonly HolyDrawDbContext _holyDrawDbContext;

        public TokenDataProvider(HolyDrawDbContext context)
        {
            _holyDrawDbContext = context;
        }

        public TokenDataProvider(DbContextOptions<HolyDrawDbContext> options)
        {
            _holyDrawDbContext = new HolyDrawDbContext(options);
        }

        /// <summary>
        ///     Create a new Token autogenerate
        /// </summary>
        public async Task<Token> Add()
        {
            const string allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz-.";
            var random = new Random();
            var resultToken = new string(
                Enumerable.Repeat(allChar, 16)
                    .Select(text => text[random.Next(text.Length)]).ToArray());

            var token = new Token(resultToken);

            var entry = await _holyDrawDbContext.Token.AddAsync(token);
            await SaveChanges();

            return entry.Entity;
        }

        /// <summary>
        ///     To discord a token
        /// </summary>
        /// <param name="tokenId"></param>
        public async Task<Token> Discard(int tokenId)
        {
            var dbToken = await _holyDrawDbContext.Token.FindAsync(tokenId);
            if (dbToken == null)
                return null;

            dbToken.DiscardAt = DateTime.Now;
            await SaveChanges();
            return dbToken;
        }

        /// <summary>
        ///     To find Player associated with the key
        /// </summary>
        /// <param name="tokenKey">the token key</param>
        /// <returns>Return the Player with associated key if player exist or null</returns>
        public async Task<Player> FindPlayer(string tokenKey)
        {
            var token = await _holyDrawDbContext.Token
                .Include(t => t.Players)
                .FirstOrDefaultAsync(t => t.TokenKey == tokenKey && t.DiscardAt == null);
            return token?.Players.FirstOrDefault();
        }

        /// <summary>
        ///     To find a Token
        /// </summary>
        /// <param name="tokenId"></param>
        /// <returns>Return token with this ID</returns>
        public async Task<Token> GetToken(int tokenId)
        {
            return await _holyDrawDbContext.Token.FindAsync(tokenId);
        }

        private async Task SaveChanges()
        {
            await _holyDrawDbContext.SaveChangesAsync();
        }
    }
}
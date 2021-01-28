using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class TokenContext : DbContext
    {
        public TokenContext(DbContextOptions<TokenContext> options)
            : base(options)
        {
        }
        public DbSet<Token> Tokens{ get; set; }
    }
}

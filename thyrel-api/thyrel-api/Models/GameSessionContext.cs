using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class GameSessionContext : DbContext
    {
        public GameSessionContext(DbContextOptions<GameSessionContext> options)
            : base(options)
        {
        }
        public DbSet<GameSession> GameSessions { get; set; }
    }
}

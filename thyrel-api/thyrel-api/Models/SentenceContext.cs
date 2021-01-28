using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class SentenceContext : DbContext
    {
        public SentenceContext(DbContextOptions<SentenceContext> options)
            : base(options)
        {
        }
        public DbSet<Sentence> Sentences { get; set; }
    }
}

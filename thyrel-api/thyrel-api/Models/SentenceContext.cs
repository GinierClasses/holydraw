using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class SentenceContext : DbContext
    {
        public DbSet<Sentence> Sentences { get; set; }
        public SentenceContext(DbContextOptions<SentenceContext> options)
            : base(options)
        {
        }
    }
}

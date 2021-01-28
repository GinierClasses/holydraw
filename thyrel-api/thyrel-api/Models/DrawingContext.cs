using Microsoft.EntityFrameworkCore;
namespace thyrel_api.Models
{
    public class DrawingContext : DbContext
    {
        public DbSet<Drawing> Drawings { get; set; }
        public DrawingContext(DbContextOptions<DrawingContext> options)
            : base(options)
        {
        }
    }
}

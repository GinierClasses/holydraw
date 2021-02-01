
using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class HolyDrawDbContext : DbContext
    {
        // delete after
        public DbSet<Test> Test { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=localhost,3306;database=test;user=root;password=root");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("test");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
            });
        }
    }
}

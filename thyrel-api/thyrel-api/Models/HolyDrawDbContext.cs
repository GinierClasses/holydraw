
using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class HolyDrawDbContext : DbContext
    {
        public DbSet<Token> Token { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=localhost,3306;database=thyrel_db;user=root;password=root");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Token>(entity =>
            {
                entity.ToTable("Token");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TokenKey).IsRequired();
                entity.HasOne(e => e.Player).WithMany(e => e.Tokens);
            });
        }
    }
}

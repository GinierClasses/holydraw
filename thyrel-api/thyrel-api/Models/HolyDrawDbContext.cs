
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
                entity.HasOne(e => e.Player)
                    .WithMany(e => e.Tokens);
            });

            modelBuilder.Entity<Session>(entity =>
            {
                entity.ToTable("Session");
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Room)
                    .WithMany(e => e.Sessions);
            });

            modelBuilder.Entity<Sentence>(entity =>
            {
                entity.ToTable("Sentence");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Text).IsRequired();
                
                entity.HasOne(e => e.Session)
                    .WithMany(e => e.Sentences);
                
                entity.HasOne(e => e.Creator)
                    .WithMany(e => e.CreatedSentences)
                    .HasForeignKey(e => e.CreatorId)
                    .HasPrincipalKey(e => e.Id);
                
                entity.HasOne(e => e.Initiator)
                    .WithMany(e => e.AlbumSentences)
                    .HasForeignKey(e => e.InitiatorId)
                    .HasPrincipalKey(e => e.Id);
            });
            
            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Identifier).IsRequired();
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("Player");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired();
                entity.Property(e => e.AvatarUrl).IsRequired();
                entity.HasOne(e => e.Room)
                    .WithMany(e => e.Players);
            });

            modelBuilder.Entity<Drawing>(entity =>
            {
                entity.ToTable("Drawing");
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Session)
                    .WithMany(e => e.Drawings);

                entity.HasOne(e => e.Initiator)
                    .WithMany(e => e.AlbumDrawings)
                    .HasForeignKey(e => e.InitiatorId)
                    .HasPrincipalKey(e => e.Id);
                
                entity.HasOne(e => e.Creator)
                    .WithMany(e => e.CreatedDrawings)
                    .HasForeignKey(e => e.CreatorId)
                    .HasPrincipalKey(e => e.Id);
            });
        }
    }
}

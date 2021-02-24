using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class HolyDrawDbContext : DbContext
    {
        public HolyDrawDbContext(DbContextOptions<HolyDrawDbContext> options)
            : base(options)
        {
        }

        public HolyDrawDbContext()
        {
        }

        public DbSet<Token> Token { get; set; }
        public DbSet<Session> Session { get; set; }
        public DbSet<Element> Element { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Player> Player { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // this code is called any times ????
                // else destroy this override function
                optionsBuilder.UseMySQL("server=localhost,3306;database=thyrel_db;user=root;password=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Token>(entity =>
            {
                entity.ToTable("Token");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TokenKey).IsRequired();
            });

            modelBuilder.Entity<Session>(entity =>
            {
                entity.ToTable("Session");
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Room)
                    .WithMany(e => e.Sessions);
            });

            modelBuilder.Entity<Element>(entity =>
            {
                entity.ToTable("Element");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(e => e.Session)
                    .WithMany(e => e.Elements);

                entity.HasOne(e => e.Creator)
                    .WithMany(e => e.CreatedElements)
                    .HasForeignKey(e => e.CreatorId)
                    .HasPrincipalKey(e => e.Id);

                entity.HasOne(e => e.Initiator)
                    .WithMany(e => e.AlbumElements)
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
                entity.HasOne(e => e.Token)
                    .WithMany(e => e.Players);
            });
        }
    }
}
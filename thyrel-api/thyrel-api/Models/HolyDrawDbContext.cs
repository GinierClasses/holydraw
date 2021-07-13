using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace thyrel_api.Models
{
    public class HolyDrawDbContext : DbContext
    {
        public HolyDrawDbContext(DbContextOptions<HolyDrawDbContext> options)
            : base(options)
        {
        }

        public DbSet<Token> Token { get; set; }
        public DbSet<Session> Session { get; set; }
        public DbSet<Element> Element { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Player> Player { get; set; }
        public DbSet<Reaction> Reaction { get; set; }

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

            modelBuilder.Entity<Reaction>(entity =>
            {
                entity.ToTable("Reaction");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Emoji).IsRequired();
                entity.HasOne(e => e.Element)
                    .WithMany(e => e.Reactions);
                entity.HasOne(e => e.Player)
                    .WithMany(e => e.Reactions);
            });
        }
    }

    public static class HolyDrawDbContextUtils
    {
        public static DbContextOptionsBuilder<HolyDrawDbContext> GetOptionsBuilder(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<HolyDrawDbContext>();
            optionsBuilder.UseMySql(
                connectionString,
                new MySqlServerVersion(new Version(8, 0, 23)),
                mySqlOptions => mySqlOptions
                    .CharSetBehavior(CharSetBehavior.NeverAppend));
            return optionsBuilder;
        }

        public static HolyDrawDbContext GetHolyDrawDbContext(string connectionString)
        {
            var optionsBuilder = GetOptionsBuilder(connectionString);
            return new HolyDrawDbContext(optionsBuilder.Options);
        }

        public static string GetConnectionString(IConfiguration configuration)
        {
            return configuration.GetConnectionString("thyrel_db") == null
                ? Environment.GetEnvironmentVariable("THYREL_CONNECTION_STRING")
                : configuration.GetConnectionString("thyrel_db");
        }
    }
}
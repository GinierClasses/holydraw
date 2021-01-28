using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thyrel_api.Models
{
    public class ThyrellContext : DbContext
    {
        public ThyrellContext(DbContextOptions<ThyrellContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Drawing> Drawings{ get; set; }
        public DbSet<Sentence> Sentences { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<GameSession> GameSessions { get; set; }

        //j'ai trouvé ce code sur un autre tuto, il permet d'eliminer les s finales pour les tables en BD, ex: GameSession(s), mais il utilise EntityFramework pas Core alors je ne sais pas 
        /*protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }*/
    }
}

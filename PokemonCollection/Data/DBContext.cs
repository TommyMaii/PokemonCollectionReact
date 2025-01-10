using Microsoft.EntityFrameworkCore;
using PokemonCollection.Models;

namespace PokemonCollection.Data;

public class DBContext : DbContext
{
    public DBContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Models.PokemonCollection> Collections { get; set; }
    public DbSet<PokemonCard> Cards { get; set; }
    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Models.PokemonCollection>()
            .HasMany(e => e.Cards)
            .WithMany(p => p.Collections);
    }
}
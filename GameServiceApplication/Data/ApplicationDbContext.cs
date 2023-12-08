using GameServiceApplication.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<PlayerProfile> PlayerProfiles { get; private set; }
    public DbSet<PlayerGameData> PlayersGameData { get; private set; }
    public DbSet<PlayerInventoryData> PlayersInventoryData { get; private set; }
    
    public DbSet<PlayerCharacterLink> PlayerCharacterLinks { get; private set; }
    public DbSet<PlayerCardLink> PlayersCardLinks { get; private set; }
    public DbSet<PlayerArtifactLink> PlayersArtifactLinks { get; private set; }
    
    public DbSet<Artifact> Artifacts { get; private set; }
    public DbSet<Card> Cards { get; private set; }
    public DbSet<Character> Characters { get; private set; }
    public DbSet<Rarity> Rarities { get; private set; }
    
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {}
}

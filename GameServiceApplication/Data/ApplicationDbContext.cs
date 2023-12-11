using GameServiceApplication.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<PlayerCoreInformation> PlayersCoreInformation { get; private set; }
    public DbSet<PlayerProfile> PlayerProfiles { get; private set; }
    public DbSet<PlayerGameData> PlayersGameData { get; private set; }
    
    public DbSet<PlayerCharacterLink> PlayerCharacterLinks { get; private set; }
    public DbSet<PlayerCardLink> PlayersCardLinks { get; private set; }
    public DbSet<PlayerArtifactLink> PlayersArtifactLinks { get; private set; }
    
    public DbSet<Artifact> ArtifactsData { get; private set; }
    public DbSet<Card> CardsData { get; private set; }
    public DbSet<Character> CharactersData { get; private set; }
    public DbSet<Rarity> RaritiesData { get; private set; }
    
    public ApplicationDbContext(DbContextOptions options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var artifactEntity = modelBuilder.Entity<Artifact>();
        artifactEntity.Property(a => a.EffectType).HasConversion(
            v => (int) v,
            v => (ArtifactEffectType) v
        );
        artifactEntity.Property(a => a.RarityId).HasConversion(
            v => (int) v,
            v => (RarityType) v
        );

        var cardEntity = modelBuilder.Entity<Card>();
        cardEntity.Property(a => a.Ability).HasConversion(
            v => (int) v,
            v => (CardAbilityType) v
        );
        
        cardEntity.Property(a => a.RarityId).HasConversion(
            v => (int) v,
            v => (RarityType) v
        );
        
        var characterEntity = modelBuilder.Entity<Character>();
        characterEntity.Property(a => a.RarityId).HasConversion(
            v => (int) v,
            v => (RarityType) v
        );
    }
}



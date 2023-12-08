using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.ReadModels;

public record PlayerProfile(int Id, string Email, string PasswordHash, string Name, string PhoneNumber, DateTime RegistrationDate);
[Keyless]
public record PlayerGameData(int PlayerId, float Gold, float Crystals, int Level, int BattlepassLevel, DateTime ActiveBattlepassUntil);
[Keyless]
public record PlayerInventoryData(int PlayerId, int Capacity);

public record PlayerCharacterLink(int Id, int PlayerId, int CharacterId);
public record PlayerCardLink(int Id, int PlayerId, int CardId);
public record PlayerArtifactLink(int Id, int PlayerId, int ArtifactId);

public record Artifact(int Id, int RarityId, int EffectType, int EffectStrength, string Name, string Description);
public record Card(int Id, int RarityId, int Ability, string Name, string Description);
public record Character(int Id, int RarityId, int Health, int Defence, int Attack, int Speed, string Name);
public record Rarity(int Id, string Name, string Description);

using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.ReadModels;

public record PlayerProfile(int Id = -1, string Email = "None", string PasswordHash = "None", string Name = "None", string PhoneNumber = "None", int HashSalt = 0, DateTime RegistrationDate = new());

[Keyless]
public record PlayerGameData(int PlayerId = -1, float Gold = -1, float Crystals = -1, int Level = -1, int BattlepassLevel = -1, DateTime ActiveBattlepassUntil = new ());

[Keyless]
public record PlayerCharacterLink(int PlayerId, int CharacterId);

[Keyless]
public record PlayerCardLink(int PlayerId, int CardId);

[Keyless]
public record PlayerArtifactLink(int PlayerId, int ArtifactId);

public record Rarity(int Id, string Name, string Description);

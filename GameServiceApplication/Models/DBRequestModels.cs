namespace GameServiceApplication.Models;

public record UserRegisterDBRequest(string Name, string Email, string Phone, string PasswordHash, int HashSalt, DateTime Date);
public record ArtifactRegisterDBRequest(string Name, string Description, int EffectType, int EffectStrength, int RarityId, double DefaultCost);

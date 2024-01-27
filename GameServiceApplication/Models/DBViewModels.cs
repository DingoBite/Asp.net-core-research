using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.Models;

[Keyless]
public record PlayerCoreInformation(int PlayerId, string Name, string Email, string PhoneNumber);

[Keyless]
public record PlayerItemAmount(int PlayerId, int ArtifactsAmount, int CardsAmount, int CharactersAmount);

[Keyless]
public record PlayerInventoryElement(ItemType ItemType = ItemType.None, int ItemId = -1, int Quantity = 0);

public record Artifact(int Id, string Name, string Description, ArtifactEffectType EffectType, int EffectStrength, RarityType RarityId, double DefaultCost);
public record Card(int Id, string Name, string Description, CardAbilityType Ability, RarityType RarityId, double DefaultCost);
public record Character(int Id, string Name, string Description, int Health, int Defence, int Attack, int Speed, RarityType RarityId, double DefaultCost);

public enum ArtifactEffectType
{
    None,
    Damage,
    DamageByTurn,
    Heal,
    HealByTurn,
    Destroy,
}

public enum CardAbilityType
{
    None,
    Heal,
    Damage,
    Summon,
    Draw,
    Discard,
    Destroy,
}

public enum RarityType
{
    None,
    Common,
    Uncommon,
    Rare,
    Legendary,
    Mythic
}

public enum ItemType
{
    None = -1,
    Card = 0,
    Character = 1,
    Artifact = 2
}



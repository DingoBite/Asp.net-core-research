namespace GameServiceApplication.Models;

public record UserRegisterRequest(string Name, string Email, string PhoneNumber, string Password, string ConfirmPassword);

public enum ResponseState
{
    Waiting,
    InvalidEmail,
    InvalidPhone,
    SomeFieldIsEmpty,
    PasswordIsTooWeak,
    PasswordsMismatch,
    Success,
    UserExists,
    UndefinedError
}

public record UserRegisterResponse(ResponseState State);


public record IdNamePair(int Id, string Name);
public record ArtifactRegisterRequest(string Name, string Description, int EffectStrength, int EffectType, int Rarity);


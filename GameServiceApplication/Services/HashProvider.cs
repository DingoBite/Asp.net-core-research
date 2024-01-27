namespace GameServiceApplication.Utils;

public interface IHashProvider
{
    public (string hash, int salt) GenerateHash(string password);
    public bool CheckPassword(string password, string storedHashedPassword, int salt);
}

public class HashProvider : IHashProvider
{
    public (string hash, int salt) GenerateHash(string password)
    {
        var salt = Random.Shared.Next(4, 31);
        var hash = BCrypt.Net.BCrypt.HashPassword(password, salt);
        return (hash, salt);
    }

    public bool CheckPassword(string password, string storedHashedPassword, int salt)
    {
        var enteredHashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
        return BCrypt.Net.BCrypt.EnhancedVerify(enteredHashedPassword, storedHashedPassword);
    }
}

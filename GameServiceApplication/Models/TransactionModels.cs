namespace GameServiceApplication.ReadModels;

public record SearchParameters(int Id, string Name, string Email, string PhoneNumber, DateTime FromDate, DateTime ToDate);

public record UserRegisterRequest(string Name, string Email, string PhoneNumber, string Password);
public record UserLoginRequest(string Email, string Password);


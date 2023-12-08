namespace GameServiceApplication.ReadModels;

public record SearchParameters(int Id, string Name, string Email, string PhoneNumber, DateTime FromDate, DateTime ToDate);
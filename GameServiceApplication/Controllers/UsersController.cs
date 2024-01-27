using System.Data.SqlClient;
using System.Text.RegularExpressions;
using GameServiceApplication.Data;
using GameServiceApplication.Models;
using GameServiceApplication.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.Controllers;

[ApiController]
[Route("[controller]")]
public partial class UsersController : ControllerBase
{
    private static readonly Regex EmailRegex = EmailRegexGenerator();
    private static readonly Regex PhoneRegex = PhoneNumberRegexGenerator();

    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _dbContext;
    private readonly IHashProvider _hashProvider;

    public UsersController(ILogger<UsersController> logger, ApplicationDbContext dbContext, IHashProvider hashProvider)
    {
        _hashProvider = hashProvider;
        _dbContext = dbContext;
        _logger = logger;
    }
    
    [HttpGet]
    public async IAsyncEnumerable<PlayerCoreInformation> GetAllPlayersCoreInfo()
    {
        await using var searchAsync = _dbContext.PlayersCoreInformation.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            yield return searchAsync.Current;
        }
    }
    
    [HttpPost]
    public async Task<UserRegisterResponse> PostUserRegister([FromBody] UserRegisterRequest userRegisterRequest)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userRegisterRequest.Name) ||
                string.IsNullOrWhiteSpace(userRegisterRequest.Email) ||
                string.IsNullOrWhiteSpace(userRegisterRequest.PhoneNumber) ||
                string.IsNullOrWhiteSpace(userRegisterRequest.Password) ||
                string.IsNullOrWhiteSpace(userRegisterRequest.ConfirmPassword))
            {
                return new UserRegisterResponse(ResponseState.SomeFieldIsEmpty);
            }

            if (userRegisterRequest.Password != userRegisterRequest.ConfirmPassword)
            {
                return new UserRegisterResponse(ResponseState.PasswordsMismatch);
            }

            if (userRegisterRequest.Password.Length < 6)
            {
                return new UserRegisterResponse(ResponseState.PasswordIsTooWeak);
            }

            if (!EmailRegex.IsMatch(userRegisterRequest.Email))
            {
                return new UserRegisterResponse(ResponseState.InvalidEmail);
            }

            if (!PhoneRegex.IsMatch(userRegisterRequest.PhoneNumber))
            {
                return new UserRegisterResponse(ResponseState.InvalidPhone);
            }

            if (await _dbContext.PlayerProfiles.AnyAsync(p => p.Email == userRegisterRequest.Email || p.PhoneNumber == userRegisterRequest.PhoneNumber))
            {
                return new UserRegisterResponse(ResponseState.UserExists);
            }

            var (passwordHash, salt) = _hashProvider.GenerateHash(userRegisterRequest.Password);
            var userRegisterDbRequest = new PlayerProfile(0, userRegisterRequest.Name, userRegisterRequest.Email, userRegisterRequest.PhoneNumber, passwordHash, salt, DateTime.Now);
            var registerUserResult = await _dbContext.PlayerProfiles.AddAsync(userRegisterDbRequest);

            if (registerUserResult.State == EntityState.Added)
            {
                await _dbContext.SaveChangesAsync();
                return new UserRegisterResponse(ResponseState.Success);
            }
            
            return new UserRegisterResponse(ResponseState.UserExists);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new UserRegisterResponse(ResponseState.UndefinedError);
        }
    }

    [HttpGet("profiles/profile/{id:int}")]
    public async Task<PlayerProfile> GetPlayerProfileInformation(int id)
    {
        var playerProfile = await _dbContext.PlayerProfiles.FirstOrDefaultAsync(x => x.Id == id);
        return playerProfile ?? new PlayerProfile();
    }

    [HttpGet("profiles/balance/{id:int}")]
    public async Task<PlayerGameData> GetPlayerGameData(int id)
    {
        var playerProfile = await _dbContext.PlayersGameData.FirstOrDefaultAsync(x => x.PlayerId == id);
        return playerProfile ?? new PlayerGameData();
    }

    [HttpGet("profiles/inventory/{id:int}")]
    public IQueryable<PlayerInventoryElement> GetPlayerInventory(int id)
    {
        return _dbContext.GetPlayerInventory(id);
    }

    [GeneratedRegex(@"^\S+@\S+\.\S+$")]
    private static partial Regex EmailRegexGenerator();
    
    [GeneratedRegex(@"\+?\(?\d{3}\)?-? *\d{3}-? *-?\d{4}")]
    private static partial Regex PhoneNumberRegexGenerator();
}
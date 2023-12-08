using GameServiceApplication.Data;
using GameServiceApplication.ReadModels;
using Microsoft.AspNetCore.Mvc;

namespace GameServiceApplication.Controllers;

[ApiController]
[Route("[controller]")]
public class PlayerProfilesController : ControllerBase
{
    private readonly ILogger<PlayerProfilesController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public PlayerProfilesController(ILogger<PlayerProfilesController> logger, ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    private bool IsInSearchParameters(PlayerProfile playerProfile, SearchParameters searchParameters) =>
        playerProfile.Id == searchParameters.Id || playerProfile.Name == searchParameters.Name ||
        playerProfile.Email == searchParameters.Email || playerProfile.PhoneNumber == searchParameters.PhoneNumber ||
        playerProfile.RegistrationDate >= searchParameters.FromDate || playerProfile.RegistrationDate <= searchParameters.ToDate;

    [HttpPost]
    public async IAsyncEnumerable<PlayerProfile> SearchAsync([FromBody] SearchParameters searchParameters)
    {
        _logger.Log(LogLevel.Information, "Try Get Search Result");
        var searchAsync = _dbContext.PlayerProfiles.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            var playerProfile = searchAsync.Current;
            if (!IsInSearchParameters(playerProfile, searchParameters))
                continue;
            yield return playerProfile;
        }
    }
    
    [HttpGet]
    public async IAsyncEnumerable<PlayerProfile> GetAllAsync()
    {
        _logger.Log(LogLevel.Information, "Try Get Search Result");
        var searchAsync = _dbContext.PlayerProfiles.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            yield return searchAsync.Current;
        }
    }
}



using System.Data.SqlClient;
using GameServiceApplication.Data;
using GameServiceApplication.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public UsersController(ILogger<UsersController> logger, ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _logger = logger;
    }
    
    [HttpGet]
    public async IAsyncEnumerable<PlayerCoreInformation> GetAllPlayersCoreInfo()
    {
        var searchAsync = _dbContext.PlayersCoreInformation.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            yield return searchAsync.Current;
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
}



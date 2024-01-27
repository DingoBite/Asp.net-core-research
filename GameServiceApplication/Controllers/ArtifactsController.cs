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
public class ArtifactsController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public ArtifactsController(ILogger<UsersController> logger, ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _logger = logger;
    }
    
    [HttpGet("types")]
    public async IAsyncEnumerable<Artifact> GetAllArtifactsInfo()
    {
        await using var searchAsync = _dbContext.ArtifactsData.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            yield return searchAsync.Current;
        }
    }

    [HttpPost]
    public async Task<UserRegisterResponse> PostArtifactRegister([FromBody] ArtifactRegisterRequest artifactRegisterRequest)
    {
        try
        {
            var rarity = await _dbContext.RaritiesData.Include(r => r.Id == artifactRegisterRequest.Rarity).FirstOrDefaultAsync();
            var userRegisterDbRequest = new Artifact(0, artifactRegisterRequest.Name, artifactRegisterRequest.Description, (ArtifactEffectType)artifactRegisterRequest.EffectType, artifactRegisterRequest.EffectStrength, rarity.Name, (RarityType)artifactRegisterRequest.Rarity);
            var registerUserResult = await _dbContext.ArtifactsData.AddAsync(userRegisterDbRequest);

            if (registerUserResult.State == EntityState.Added)
                return new UserRegisterResponse(ResponseState.Success);
            
            return new UserRegisterResponse(ResponseState.UserExists);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new UserRegisterResponse(ResponseState.UndefinedError);
        }
    }
}
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
public class CardsController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public CardsController(ILogger<UsersController> logger, ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _logger = logger;
    }
    
    [HttpGet("types")]
    public IEnumerable<IdNamePair> GetAllTypes()
    {
        var artifactEffectTypes = Enum.GetNames<CardAbilityType>();
        for (var i = 0; i < artifactEffectTypes.Length; i++)
        {
            yield return new IdNamePair(i, artifactEffectTypes[i]);
        }
    }
    
    [HttpGet]
    public async IAsyncEnumerable<Card> GetAllInfo()
    {
        await using var searchAsync = _dbContext.Cards.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            yield return searchAsync.Current;
        }
    }
    
    [HttpPost("remove")]
    public async Task PostRemove([FromBody] int id)
    {
        try
        {
            var entity = await _dbContext.Cards.FirstOrDefaultAsync(a => a.Id == id);
            if (entity == null)
                return;

            _dbContext.Cards.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    [HttpPost]
    public async Task<UserRegisterResponse> PostRegister([FromBody] CardRegisterRequest request)
    {
        try
        {
            var userRegisterDbRequest = new Card(0, request.Name, request.Description,
                (CardAbilityType)request.AbilityType,
                (RarityType)request.Rarity, request.DefaultCost);
            
            var registerUserResult = await _dbContext.Cards.AddAsync(userRegisterDbRequest);

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
}
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
public class CharactersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public CharactersController(ILogger<UsersController> logger, ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _logger = logger;
    }
    
    [HttpGet]
    public async IAsyncEnumerable<Character> GetAllInfo()
    {
        await using var searchAsync = _dbContext.Characters.GetAsyncEnumerator();
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
            var entity = await _dbContext.Characters.FirstOrDefaultAsync(a => a.Id == id);
            if (entity == null)
                return;

            _dbContext.Characters.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
    
    [HttpPost]
    public async Task<UserRegisterResponse> PostRegister([FromBody] CharacterRegisterRequest request)
    {
        try
        {
            var userRegisterDbRequest = new Character(0, request.Name, request.Description,
                request.Health, request.Defence, request.Attack, request.Speed, (RarityType)request.RarityId, request.DefaultCost);
            
            var registerUserResult = await _dbContext.Characters.AddAsync(userRegisterDbRequest);

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
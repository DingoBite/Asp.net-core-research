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
public class GeneralController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public GeneralController(ILogger<UsersController> logger, ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    [HttpGet("rarities")]
    public async IAsyncEnumerable<IdNamePair> GetAllRarities()
    {
        await using var searchAsync = _dbContext.Rarities.GetAsyncEnumerator();
        while (await searchAsync.MoveNextAsync())
        {
            var rarity = searchAsync.Current;
            yield return new IdNamePair(rarity.Id, rarity.Name) ;
        }
    }
}
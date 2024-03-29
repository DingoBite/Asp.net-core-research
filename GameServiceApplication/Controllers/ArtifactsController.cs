﻿using System.Data.SqlClient;
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
    public IEnumerable<IdNamePair> GetAllTypes()
    {
        var artifactEffectTypes = Enum.GetNames<ArtifactEffectType>();
        for (var i = 0; i < artifactEffectTypes.Length; i++)
        {
            yield return new IdNamePair(i, artifactEffectTypes[i]);
        }
    }
    
    [HttpGet]
    public async IAsyncEnumerable<Artifact> GetAllInfo()
    {
        await using var searchAsync = _dbContext.Artifacts.GetAsyncEnumerator();
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
            var entity = await _dbContext.Artifacts.FirstOrDefaultAsync(a => a.Id == id);
            if (entity == null)
                return;

            _dbContext.Artifacts.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    
    [HttpPost]
    public async Task<UserRegisterResponse> PostRegister([FromBody] ArtifactRegisterRequest request)
    {
        try
        {
            var userRegisterDbRequest = new Artifact(0, request.Name, request.Description,
                (ArtifactEffectType)request.EffectType, request.EffectStrength,
                (RarityType)request.Rarity, request.DefaultCost);
            
            var registerUserResult = await _dbContext.Artifacts.AddAsync(userRegisterDbRequest);

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
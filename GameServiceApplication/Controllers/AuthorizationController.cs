using GameServiceApplication.Data;
using GameServiceApplication.ReadModels;
using GameServiceApplication.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameServiceApplication.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly ILogger<AuthorizationController> _logger;
    private readonly ApplicationDbContext _dbContext;
    private readonly IHashProvider _hashProvider;

    public AuthorizationController(ILogger<AuthorizationController> logger, ApplicationDbContext dbContext, IHashProvider hashProvider)
    {
        _hashProvider = hashProvider;
        _dbContext = dbContext;
        _logger = logger;
    }

    [HttpPost]
    [Route("register")]
    public async Task<bool> Register([FromBody] UserRegisterRequest registerRequest)
    {
        var (hash, salt) = _hashProvider.GenerateHash(registerRequest.Password);
        var query = await Task.Run(() => _dbContext.Database.SqlQuery<bool>(
            $"EXECUTE playerregister({registerRequest.Name}, {registerRequest.Email}, {registerRequest.PhoneNumber}, {hash}, {salt}, {DateTime.Now})"
        ));
        var result = await query.FirstOrDefaultAsync();
        HttpContext.User = new SimplePrincipal(new SimpleIdentity(registerRequest.Name, result));
        return result;
    }

    [HttpGet]
    [Route("isauthorized")]
    public Task<bool> IsAuthorized()
    {
        var identity = HttpContext.User.Identity;
        var authorized = identity != null && identity.IsAuthenticated;
        if (authorized)
        {
            RedirectPermanent("");
            return Task.FromResult(true);
        }

        if (identity == null)
        {
            RedirectPermanent("~/authorization/register");
            return Task.FromResult(false);
        }

        RedirectPermanent("~/authorization/login");
        return Task.FromResult(false);
    }

    [HttpPost]
    [Route("login")]S
    public async Task<bool> LogIn([FromBody] UserLoginRequest loginRequest)
    {
        var user = await _dbContext.PlayerProfiles.FirstOrDefaultAsync(
            p => p.Email == loginRequest.Email && _hashProvider.CheckPassword(loginRequest.Password, p.PasswordHash, p.HashSalt)
            );
        
        if (user == null)
            return false;
        HttpContext.User = new SimplePrincipal(new SimpleIdentity(user.Name, true));
        RedirectPermanent("");
        return true;
    }
    
    [HttpPost]
    [Route("logout")]
    public Task LogOut()
    {
        if (HttpContext.User.Identity == null)
        {
            RedirectPermanent("~/authorization/register");
            return Task.CompletedTask;
        }
        HttpContext.User = new SimplePrincipal(new SimpleIdentity(HttpContext.User.Identity.Name, false));
        RedirectPermanent("~/authorization/login");
        return Task.CompletedTask;
    }
}

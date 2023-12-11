using System.Security.Principal;

namespace GameServiceApplication.Controllers;

public class SimpleIdentity : IIdentity
{
    public SimpleIdentity(string? name, bool isAuthenticated)
    {
        Name = name;
        IsAuthenticated = isAuthenticated;
    }

    public string? AuthenticationType => "Custom";
    public bool IsAuthenticated { get; }
    public string? Name { get; }
}
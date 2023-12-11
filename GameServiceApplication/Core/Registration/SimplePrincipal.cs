using System.Security.Claims;
using System.Security.Principal;

namespace GameServiceApplication.Controllers;

public class SimplePrincipal : ClaimsPrincipal
{
    public SimplePrincipal(IIdentity? identity)
    {
        Identity = identity;
    }

    public IIdentity? Identity { get; }
}
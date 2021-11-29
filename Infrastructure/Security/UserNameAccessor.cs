using System.Security.Claims;
using Application.Interface;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserNameAccessor : IUserNameAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserNameAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUserName()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
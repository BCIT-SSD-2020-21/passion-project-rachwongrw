using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using passion_project.Areas.Identity;
using passion_project.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace passion_project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private IServiceProvider _serviceProvider;

        public AuthController(IConfiguration config, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IServiceProvider serviceProvider)
        {
            _config = config;
            _signInManager = signInManager;
            _userManager = userManager;
            _serviceProvider = serviceProvider;
        }

        [HttpPost("Register")]
        public async Task<JsonResult> RegisterAsync([FromBody] RegisterVM registerVM)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = registerVM.Email, Email = registerVM.Email, EmailConfirmed = true, fName = registerVM.fName, lName = registerVM.lName };
                var result = await _userManager.CreateAsync(user, registerVM.Password);
                if (result.Succeeded)
                {
                    return await SignInAsync(new LoginVM() { Email = registerVM.Email, Password = registerVM.Password });
                }
            }
            dynamic jsonResponse = new JObject();
            jsonResponse.token = "";
            jsonResponse.status = "Registration Failed";
            return Json(jsonResponse);
        }

        [HttpPost("Login")]
        public async Task<JsonResult> SignInAsync([FromBody] LoginVM loginVM)
        {
            dynamic jsonResponse = new JObject();
            if (ModelState.IsValid)
            {
                var result = await
                            _signInManager.PasswordSignInAsync(loginVM.Email.ToUpper(),
                            loginVM.Password, loginVM.RememberMe, lockoutOnFailure: true);
                if (result.Succeeded)
                {

                    var user = await _userManager.FindByEmailAsync(loginVM.Email);

                    if (user != null)
                    {
                        var tokenString = GenerateJSONWebToken(user);
                        jsonResponse.token = tokenString;
                        jsonResponse.status = "OK";
                        return Json(jsonResponse);
                    }
                }
                else if (result.IsLockedOut)
                {
                    jsonResponse.token = "";
                    jsonResponse.status = "Locked Out";
                    return Json(jsonResponse);
                }
            }
            jsonResponse.token = "";
            jsonResponse.status = "Invalid Login";
            return Json(jsonResponse);
        }

        string GenerateJSONWebToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT_SITEKEY"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["JWT_ISSUER"], _config["JWT_ISSUER"], claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}

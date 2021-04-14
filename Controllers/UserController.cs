using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using passion_project.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace passion_project.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UserController(ApplicationDbContext db)
        {
            _db = db;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        [Route("listened")]
        public IActionResult GetAllListened()

        {
            try
            {
                var userId = HttpContext.User.Claims.ElementAt(0).Value;
                var listened = _db.Users
                    .Where(u => u.Id == userId);
                if (listened == null)
                {
                    return NotFound();
                }
                return Ok(listened);
            } catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("listened/{Id}")]
        public IActionResult AddListened(string Id)

        {
            try
            {
                var userId = HttpContext.User.Claims.ElementAt(0).Value;
                var allUsers = _db.Users.Where(t => t == t);
                var user = _db.Users.SingleOrDefault(u => u.Id == userId);
                if (user == null)
                {
                    return NotFound();
                }
                
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using passion_project.Areas.Identity;
using passion_project.Data;
using passion_project.Network;
using passion_project.ViewModels;
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
        [Route("profile")]
        public IActionResult GetProfile()
        {
            try
            {
                var userId = HttpContext.User.Claims.ElementAt(0).Value;
                var user = _db.Users.Cast<ApplicationUser>()
                    .Include(user => user.BooksListened)
                    .Where(user => user.Email == userId)
                    .FirstOrDefault();

                if (user == null)
                {
                    return NotFound();
                }

                var userVm = new UserVM()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    BooksListened = user.BooksListened
                };
                return Ok(userVm);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("listened/{Id}")]
        public async Task<IActionResult> AddListenedAsync(string Id)

        {
            try
            {
                var userId = HttpContext.User.Claims.ElementAt(0).Value;
                var user = _db.Users
                    .Include(user => user.BooksListened)
                    .SingleOrDefault(u => u.Email == userId);

                var book = await LibrivoxAPI.GetBook(Id);
                if (user == null || book == null)
                {
                    return NotFound();
                }

                var bookExists = _db.Books.SingleOrDefault(b => b.Id == Id);
                if (bookExists == null)
                {
                    _db.Books.Add(book);
                }

                if (user.BooksListened.SingleOrDefault(b => b.Id == Id) == null)
                {
                    user.BooksListened.Add(book);
                }
                _db.SaveChanges();

                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

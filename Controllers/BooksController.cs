using Microsoft.AspNetCore.Mvc;
using passion_project.Entities;
using passion_project.Network;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace passion_project.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        [HttpGet("limit={limit}&offset={offset}")]
        public async Task<IActionResult> GetAsync(int limit, int offset)
        {
            try
            {
                var books = await LibrivoxAPI.GetBookList(limit, offset);
                return Ok(books.Books);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("{id}", Name = "GetBook")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var book = await LibrivoxAPI.GetBook(id);
                if (book == null)
                {
                    return NotFound(id);
                }
                return Ok(book);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("search/{searchTerm}")]
        public async Task<IActionResult> Search(string searchTerm)
        {
            try
            {
                var books = await LibrivoxAPI.SearchBooks(searchTerm);

                if (books == null)
                {
                    return NotFound(searchTerm);
                }

                return Ok(books.Books);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

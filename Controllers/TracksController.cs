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
    public class TracksController : ControllerBase
    {
         [HttpGet("{id}", Name = "GetTrack")]
        public async Task<IActionResult> GetById(string id)
        {
            var track = await LibrivoxAPI.GetTrack(id);
            if (track == null)
            {
                return NotFound(id);
            }
            return Ok(track);
        }
    }
}

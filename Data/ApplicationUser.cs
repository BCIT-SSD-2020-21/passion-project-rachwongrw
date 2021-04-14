using Microsoft.AspNetCore.Identity;
using passion_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace passion_project.Areas.Identity
{
    public class ApplicationUser: IdentityUser
    {
        public virtual ICollection<Book> BooksListened { get; set; }
    }
}

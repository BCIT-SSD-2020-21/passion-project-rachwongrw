using passion_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace passion_project.ViewModels
{
    public class UserVM
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public string fName { get; set; }
        public string lName { get; set; }
        public string profileImg { get; set; }

        public virtual ICollection<Book> BooksListened { get; set; }

    }
}

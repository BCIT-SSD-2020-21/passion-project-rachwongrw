using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace passion_project.Entities
{
    public class BookList
    {
        [JsonPropertyName("books")]
        public List<Book> Books { get; set; }
    }
}

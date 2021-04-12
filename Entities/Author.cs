using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace passion_project.Entities
{
    public class Author
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }
        [JsonPropertyName("last_name")]
        public string LastName { get; set; }
        [JsonPropertyName("dob")]
        public string DateOfBirth{ get; set; }
        [JsonPropertyName("dod")]
        public string DateOfDeath { get; set; }

    }
}

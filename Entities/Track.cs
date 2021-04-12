using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace passion_project.Entities
{

    public class Section
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("section_number")]
        public string SectionNumber { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("language")]
        public string Language { get; set; }
        [JsonPropertyName("playtime")]
        public string Playtime { get; set; }
        [JsonPropertyName("file_name")]
        public string FileName { get; set; }
    }

    public class Track
    {
        [JsonPropertyName("sections")]
        public List<Section> Sections;
    }

}

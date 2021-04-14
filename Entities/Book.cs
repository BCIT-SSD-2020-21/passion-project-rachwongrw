using passion_project.Areas.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace passion_project.Entities
{
    public class Book
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("url_text_source")]
        public string Text_Source { get; set; }
        [JsonPropertyName("language")]
        public string Language { get; set; }
        [JsonPropertyName("copyright_year")]
        public string Copyright_Year { get; set; }
        [JsonPropertyName("num_sections")]
        public string Num_Sections { get; set; }
        [JsonPropertyName("url_rss")]
        public string Url_Rss { get; set; }
        [JsonPropertyName("url_zip_file")]
        public string Url_Zip_file { get; set; }
        [JsonPropertyName("url_project")]
        public string Url_Project { get; set; }
        [JsonPropertyName("url_librivox")]
        public string Url_Librivox { get; set; }
        [JsonPropertyName("url_other")]
        public string Url_Other { get; set; }
        [JsonPropertyName("totaltime")]
        public string Total_time { get; set; }
        [JsonPropertyName("totaltimesecs")]
        public int Total_Time_Secs { get; set; }
        [JsonPropertyName("authors")]
        [NotMapped]
        public List<Author> Authors { get; set; }
        [JsonPropertyName("sections")]
        [NotMapped]
        public List<string> Sections { get; set; }
        [JsonPropertyName("genres")]
        [NotMapped]
        public List<string> Genres { get; set; }
        [JsonPropertyName("translators")]
        [NotMapped]
        public List<string> Translators { get; set; }
        [JsonIgnore]
        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}

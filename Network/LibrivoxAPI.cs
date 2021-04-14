using passion_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using System.ServiceModel.Syndication;
using System.Xml;
using System.Text.Json.Serialization;

namespace passion_project.Network
{
    public class LibrivoxAPI
    {
        private static readonly HttpClient client = new HttpClient();
        private static readonly string baseurl = "https://librivox.org/api/feed/audiobooks/limit/20/offset/0?format=json";

        public static async Task<BookList> GetBookList()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var streamTask = client.GetStreamAsync(baseurl);
            var books = await JsonSerializer.DeserializeAsync<BookList>(await streamTask);
            return books;
        }

        // Used for deserialization in the GetCover function 
        private class IArchiveModel
        {
            [JsonPropertyName("misc")]
            public IArchiveModelMisc Misc { get; set; }
        }

        private class IArchiveModelMisc
        {
            [JsonPropertyName("image")]
            public string Image { get; set; }
        }
        private static async Task<string> GetCover(string archiveUrl)
        {
            // The name of the archive.org resource is the last thing in the URL
            var archiveId = archiveUrl.Split('/').Last();
            var url = $"https://archive.org/details/{archiveId}?output=json";
            var streamTask = client.GetStreamAsync(url);
            var cover = await JsonSerializer.DeserializeAsync<IArchiveModel>(await streamTask);
            // The API returns a thumb image, but the full sized image has the same url without _thumb at the end of the filename
            return cover?.Misc?.Image.Replace("_thumb", "");
            
        }

        public static async Task<Book> GetBook(string id)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //🤢 Doesnt seem like there's a way to exclude fields, so we have to include every field instead
            try
            {


                var url = String.Format("{0}&id={1}&extended=1&fields={{url_iarchive,id,title,description,url_text_source,language,copyright_year,num_sections,url_rss,url_librivox,totaltime,totaltimesecs,authors}}", baseurl, id);
                var streamTask = client.GetStreamAsync(url);
                var book = (await JsonSerializer.DeserializeAsync<BookList>(await streamTask)).Books[0];
                if (book?.Url_Iarchive != null)
                {
                    var cover = await GetCover(book?.Url_Iarchive);
                    if (cover != null)
                    {
                        book.Url_Image = cover;
                    }
                }
                return book;
            }
            catch (Exception)
            {
                return await Task.FromResult<Book>(null);

            }
        }

        public static async Task<BookList> SearchBooks(string searchTerm)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var searchUrl = "https://librivox.org/api/feed/audiobooks/title/^{0}?format=json";
            var url = String.Format(searchUrl, searchTerm);
            try
            {
                var streamTask = client.GetStreamAsync(url);
                var books = await JsonSerializer.DeserializeAsync<BookList>(await streamTask);
                return books;
            }
            catch (Exception)
            {
                return await Task.FromResult<BookList>(null);
            }
        }

        // Returns null, needs further adjustment
        public static async Task<Track> GetTrack(string id)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var trackurl = "https://librivox.org/api/feed/audiotracks/?format=json&project_id={0}";
            var url = String.Format(trackurl, id);
            try
            {
                var streamTask = client.GetStreamAsync(url);
                var track = await JsonSerializer.DeserializeAsync<Track>(await streamTask);
                return track;

            }
            catch (Exception)
            {
                return await Task.FromResult<Track>(null);
            }

        }

        public static async Task<Track> GetTrackLinks(string id)
        {
            // TODO: Error handling
            Book book = await GetBook(id);
            Track tracklist = await GetTrack(id);
            var rssUrl = book?.Url_Rss;
            if (rssUrl == null)
            {
                return null;
            }
            XmlReader reader = XmlReader.Create(rssUrl);
            SyndicationFeed feed = SyndicationFeed.Load(reader);
            reader.Close();
            for (var i = 0; i < feed.Items.Count(); i++)
            {
                var match = tracklist.Section.ElementAt(i);
                if (match != null)
                {
                    match.ListenUrl = feed.Items.ElementAt(i)?.Links?[1]?.Uri.ToString();
                }
            }
            return tracklist;
        }

    }
}

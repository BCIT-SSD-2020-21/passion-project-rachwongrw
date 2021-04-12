using passion_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace passion_project.Network
{
    public class LibrivoxAPI
    {
        private static readonly HttpClient client = new HttpClient();
        private static readonly string baseurl = "https://librivox.org/api/feed/audiobooks?format=json";

        public static async Task<BookList> GetBookList()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var streamTask = client.GetStreamAsync(baseurl);
            var books = await JsonSerializer.DeserializeAsync<BookList>(await streamTask);
            return books;
        }

        public static async Task<Book> GetBook(string id)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var url = String.Format("{0}&id={1}", baseurl, id);
            try
            {
                var streamTask = client.GetStreamAsync(url);
                var book = await JsonSerializer.DeserializeAsync<BookList>(await streamTask);
                return book.Books[0];

            }
            catch (Exception)
            {
                return await Task.FromResult<Book>(null);
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

    }
}

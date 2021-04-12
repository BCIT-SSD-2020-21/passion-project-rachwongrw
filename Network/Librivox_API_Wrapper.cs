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
    public class Librivox_API_Wrapper
    {
        private static readonly HttpClient client = new HttpClient();
        private static readonly string url = "https://librivox.org/api/feed/audiobooks?format=json";

        public static async Task<BookList> GetBookList()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var streamTask = client.GetStreamAsync(url);
            var books = await JsonSerializer.DeserializeAsync<BookList>(await streamTask);
            return books;
        }
    }
}

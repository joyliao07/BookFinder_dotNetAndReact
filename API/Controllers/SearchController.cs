using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class SearchController : BaseApiController
    {
        private static readonly HttpClient client = new HttpClient();
        private readonly IConfiguration _config;

        public SearchController(IConfiguration config)
        {
            _config = config;
        }

        // http://localhost:5000/api/search
        [HttpGet]
        public async Task<ActionResult> SearchBooks()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept
            .Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var stringTask = await client.GetStringAsync("https://www.googleapis.com/books/v1/volumes?q=constellation&key=" + _config["BookApi"]);
            return Ok(stringTask);
        }



        
    }
}
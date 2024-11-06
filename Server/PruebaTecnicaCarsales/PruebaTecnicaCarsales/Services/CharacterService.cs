using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PruebaTecnicaCarsales.Models;


namespace PruebaTecnicaCarsales.Services
{

    public class CharacterService
    {
        private readonly HttpClient _httpClient;

        public CharacterService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CharacterResponse> GetCharactersAsync(int page)
        {
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/character/?page={page}");
            return JsonConvert.DeserializeObject<CharacterResponse>(response);
        }

        public async Task<Character> GetCharacterByIdAsync(int id)
        {
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/character/{id}");
            return JsonConvert.DeserializeObject<Character>(response);
        }

        public async Task<IEnumerable<Character>> GetMultipleCharactersByIdsAsync(IEnumerable<int> ids)
        {
            string idsParam = string.Join(",", ids);
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/character/{idsParam}");
            return JsonConvert.DeserializeObject<IEnumerable<Character>>(response);
        }

        public async Task<CharacterResponse> FilterCharactersAsync(string name, string status, string species, string type, string gender)
        {
            var baseUrl = "https://rickandmortyapi.com/api/character/";
            var query = "?";

          
            if (!string.IsNullOrEmpty(name)) query += $"name={name}&";
            if (!string.IsNullOrEmpty(status)) query += $"status={status}&";
            if (!string.IsNullOrEmpty(species)) query += $"species={species}&";
            if (!string.IsNullOrEmpty(type)) query += $"type={type}&";
            if (!string.IsNullOrEmpty(gender)) query += $"gender={gender}&";

         
            if (query.EndsWith("&")) query = query.Remove(query.Length - 1);

          
            Console.WriteLine($"Request URL: {baseUrl + query}");

            var response = await _httpClient.GetStringAsync(baseUrl + query);

            Console.WriteLine(response);
            return JsonConvert.DeserializeObject<CharacterResponse>(response);
        }

    }
}

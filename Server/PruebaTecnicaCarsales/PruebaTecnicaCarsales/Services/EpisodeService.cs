using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PruebaTecnicaCarsales.Models;

namespace PruebaTecnicaCarsales.Services
{
    public class EpisodeService
    {
        private readonly HttpClient _httpClient;

        public EpisodeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<EpisodeResponse> GetEpisodesAsync(int page)
        {
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/episode?page={page}");
            return JsonConvert.DeserializeObject<EpisodeResponse>(response);
        }

        public async Task<Episode> GetEpisodeByIdAsync(int id)
        {
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/episode/{id}");
            return JsonConvert.DeserializeObject<Episode>(response);
        }

        public async Task<IEnumerable<Episode>> GetMultipleEpisodesByIdsAsync(IEnumerable<int> ids)
        {
            string idsParam = string.Join(",", ids);
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/episode/{idsParam}");
            return JsonConvert.DeserializeObject<IEnumerable<Episode>>(response);
        }

        public async Task<EpisodeResponse> FilterEpisodesAsync(string name, string episodeCode, int page = 1)
        {
            var query = $"https://rickandmortyapi.com/api/episode?page={page}";
            if (!string.IsNullOrEmpty(name)) query += $"&name={name}";
            if (!string.IsNullOrEmpty(episodeCode)) query += $"&episode={episodeCode}";

            var response = await _httpClient.GetStringAsync(query);
            return JsonConvert.DeserializeObject<EpisodeResponse>(response);
        }
    }
}

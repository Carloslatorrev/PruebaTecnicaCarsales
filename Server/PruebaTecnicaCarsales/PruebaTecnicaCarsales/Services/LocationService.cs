using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PruebaTecnicaCarsales.Models;

namespace PruebaTecnicaCarsales.Services
{
    public class LocationService
    {
        private readonly HttpClient _httpClient;

        public LocationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<LocationResponse> GetLocationsAsync(int page)
        {
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/location?page={page}");
            return JsonConvert.DeserializeObject<LocationResponse>(response);
        }

        public async Task<Location> GetLocationByIdAsync(int id)
        {
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/location/{id}");
            return JsonConvert.DeserializeObject<Location>(response);
        }

        public async Task<IEnumerable<Location>> GetMultipleLocationsByIdsAsync(IEnumerable<int> ids)
        {
            string idsParam = string.Join(",", ids);
            var response = await _httpClient.GetStringAsync($"https://rickandmortyapi.com/api/location/{idsParam}");
            return JsonConvert.DeserializeObject<IEnumerable<Location>>(response);
        }

        public async Task<LocationResponse> FilterLocationsAsync(string name = null, string type = null, string dimension = null, int page = 1)
        {
            var query = $"https://rickandmortyapi.com/api/location?page={page}";
            if (!string.IsNullOrEmpty(name)) query += $"&name={name}";
            if (!string.IsNullOrEmpty(type)) query += $"&type={type}";
            if (!string.IsNullOrEmpty(dimension)) query += $"&dimension={dimension}";

            var response = await _httpClient.GetStringAsync(query);
            return JsonConvert.DeserializeObject<LocationResponse>(response);
        }
    }
}

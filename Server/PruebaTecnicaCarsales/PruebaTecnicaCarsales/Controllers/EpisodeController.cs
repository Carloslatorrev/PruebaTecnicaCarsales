using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using PruebaTecnicaCarsales.Models;
using PruebaTecnicaCarsales.Services;

namespace PruebaTecnicaCarsales.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EpisodeController : ControllerBase
    {
        private readonly EpisodeService _episodeService;

        public EpisodeController(EpisodeService episodeService)
        {
            _episodeService = episodeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEpisodes(int page = 1)
        {
            var episodes = await _episodeService.GetEpisodesAsync(page);
            return Ok(episodes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEpisodeById(int id)
        {
            var episode = await _episodeService.GetEpisodeByIdAsync(id);
            return episode != null ? Ok(episode) : NotFound();
        }

        [HttpGet("multiple")]
        public async Task<IActionResult> GetMultipleEpisodesByIds([FromQuery] List<int> ids)
        {
            var episodes = await _episodeService.GetMultipleEpisodesByIdsAsync(ids);
            return Ok(episodes);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterEpisodes([FromQuery] string name, [FromQuery] string episode, int page = 1)
        {

            try
            {
                var filteredEpisodes = await _episodeService.FilterEpisodesAsync(name, episode, page);
                return Ok(filteredEpisodes);
            }
            catch (HttpRequestException ex) when (ex.Message.Contains("404"))
            {
               
                return NotFound("No se encontraron episodios con esos filtros.");
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Error al procesar la solicitud: {ex.Message}");
            }

            
        }
    }
}

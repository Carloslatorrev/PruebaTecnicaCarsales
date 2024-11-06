using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using PruebaTecnicaCarsales.Models;
using PruebaTecnicaCarsales.Services;
using System.Reflection;

namespace PruebaTecnicaCarsales.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly LocationService _locationService;

        public LocationController(LocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLocations(int page = 1)
        {
            var locations = await _locationService.GetLocationsAsync(page);
            return Ok(locations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocationById(int id)
        {
            var location = await _locationService.GetLocationByIdAsync(id);
            return location != null ? Ok(location) : NotFound();
        }

        [HttpGet("multiple")]
        public async Task<IActionResult> GetMultipleLocationsByIds([FromQuery] List<int> ids)
        {
            var locations = await _locationService.GetMultipleLocationsByIdsAsync(ids);
            return Ok(locations);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterLocations([FromQuery] string name, [FromQuery] string type, [FromQuery] string dimension, int page = 1)
        {

            try
            {
                var filteredLocations = await _locationService.FilterLocationsAsync(name, type, dimension, page);
                return Ok(filteredLocations);
            }
            catch (HttpRequestException ex) when (ex.Message.Contains("404"))
            {
                return NotFound("No se encontraron ubicaciones con esos filtros.");
            }
            catch (Exception ex)
            {
         
                return StatusCode(500, $"Error al procesar la solicitud: {ex.Message}");
            }


            
        }
    }
}

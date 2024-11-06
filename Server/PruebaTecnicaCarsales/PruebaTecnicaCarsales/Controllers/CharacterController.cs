using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using PruebaTecnicaCarsales.Models;
using PruebaTecnicaCarsales.Services;

namespace PruebaTecnicaCarsales.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly CharacterService _characterService;

        public CharacterController(CharacterService characterService)
        {
            _characterService = characterService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCharacters(int page = 1)
        {
            var characters = await _characterService.GetCharactersAsync(page);
            return Ok(characters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCharacterById(int id)
        {
            var character = await _characterService.GetCharacterByIdAsync(id);
            return character != null ? Ok(character) : NotFound();
        }

        [HttpGet("multiple")]
        public async Task<IActionResult> GetMultipleCharactersByIds([FromQuery] List<int> ids)
        {
            var characters = await _characterService.GetMultipleCharactersByIdsAsync(ids);
            return Ok(characters);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterCharacters([FromQuery] string name = null, [FromQuery] string status = null, [FromQuery] string species = null, [FromQuery] string gender = null, [FromQuery] string type = null)
        {


            try
            {
                
                var filteredCharacters = await _characterService.FilterCharactersAsync(name, status, species, type, gender);
                return Ok(filteredCharacters);
            }
            catch (HttpRequestException ex) when (ex.Message.Contains("404"))
            {
                
                return NotFound("No se encontraron personajes con esos filtros.");
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, $"Error al procesar la solicitud: {ex.Message}");
            }


           
        }
    }
}
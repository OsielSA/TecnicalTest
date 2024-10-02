using Microsoft.AspNetCore.Mvc;
using TecnicalTestApi.Models;
using TecnicalTestApi.Services;

namespace TecnicalTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PositionController : ControllerBase
    {
        private readonly PositionService _positionService;

        public PositionController(PositionService positionService)
        {
            _positionService = positionService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Position>>> GetPositions([FromQuery] string position = null)
        {
            var positions = await _positionService.GetPositionsAsync(position);
            return Ok(positions);
        }
        [HttpPost]
        public async Task<IActionResult> SavePosition(Position position)
        {
            await _positionService.SavePosition(position);
            return Ok(new { message = "Position saved successfully" });
        }
        [HttpDelete]
        public async Task<IActionResult> DeletePosition(int positionId)
        {
            await _positionService.DeletePosition(positionId);
            return Ok(new { message = "Position deleted successfully" });
        }
    }
}

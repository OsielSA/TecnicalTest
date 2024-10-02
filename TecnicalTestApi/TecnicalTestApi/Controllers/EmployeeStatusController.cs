using Microsoft.AspNetCore.Mvc;
using TecnicalTestApi.Models;
using TecnicalTestApi.Services;

namespace TecnicalTestApi.Controllers
{
    [ApiController]
    [Route("api/Status")]
    public class EmployeeStatusController : ControllerBase
    {
        private readonly EmployeeStatusService _employeeStatusService;
        public EmployeeStatusController(EmployeeStatusService employeeStatusService) {
            _employeeStatusService = employeeStatusService;
        }
        [HttpGet]
        public async Task<ActionResult<List<EmployeeStatus>>> GetEmployeeStatuses([FromQuery] string status = null)
        {
            var statuses = await _employeeStatusService.GetEmployeeStatusesAsync(status);
            return Ok(statuses);
        }
        [HttpPost]
        public async Task<IActionResult> SaveEmployeeStatus(EmployeeStatus status)
        {
            await _employeeStatusService.SaveEmployeeStatus(status);
            return Ok(new { message = "Status saved successfully" });
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteEmployeeStatus(int statusId)
        {
            await _employeeStatusService.DeleteEmployeeStatus(statusId);
            return Ok(new { message = "Status deleted successfully" });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using TecnicalTestApi.Models;
using TecnicalTestApi.Services;

namespace TecnicalTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeesController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery] string filterName = null, [FromQuery] int? positionId = null)
        {
            var employees = await _employeeService.GetEmployeesAsync(filterName, positionId);
            return Ok(employees);
        }

        [HttpGet("statuses")]
        public async Task<ActionResult<List<EmployeeStatus>>> GetEmployeeStatuses()
        {
            var statuses = await _employeeService.GetEmployeeStatusesAsync();
            return Ok(statuses);
        }
    }
}

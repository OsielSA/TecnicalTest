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
        public async Task<IActionResult> GetEmployees([FromQuery] string filterName = null, [FromQuery] string position = null)
        {
            var employees = await _employeeService.GetEmployeesAsync(filterName, position);
            return Ok(employees);
        }
        [HttpPost("SaveEmployee")]
        public async Task<IActionResult> SaveEmployee(Employee employee)
        {
            await _employeeService.SaveEmployee(employee);
            return Ok(new { message = "Employee saved successfully" });
        }
        [HttpPost("SetEmployeeStatus")]
        public async Task<IActionResult> SetEmployeeStatus(int employeeId, int statusId)
        {
            await _employeeService.SetEmployeeStatus(employeeId, statusId);
            return Ok(new { message = "Employee status updated successfully" });
        }

    }
}

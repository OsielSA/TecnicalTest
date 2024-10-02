using Microsoft.EntityFrameworkCore;
using TecnicalTestApi.Data;
using TecnicalTestApi.Models;

namespace TecnicalTestApi.Services
{
    public class EmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetEmployeesAsync(string filterName = null, string position = null, int? status_id = null)
        {
            return await _context.GetEmployeesAsync(filterName, position, status_id);
        }
        public async Task SaveEmployee(Employee employee)
        {
            await _context.SaveEmployeeAsync(employee);
        }
        public async Task SetEmployeeStatus(int employeeId, int statusId)
        {
            await _context.SetEmployeeStatusAsync(employeeId, statusId);
        }
    }
}

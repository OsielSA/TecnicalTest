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

        public async Task<List<EmployeeDto>> GetEmployeesAsync(string filterName = null, int? positionId = null)
        {
            return await _context.GetEmployeesAsync(filterName, positionId);
        }

        public async Task<List<EmployeeStatus>> GetEmployeeStatusesAsync()
        {
            return await _context.GetEmployeeStatuses();
        }
    }
}

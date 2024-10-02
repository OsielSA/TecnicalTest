using TecnicalTestApi.Data;
using TecnicalTestApi.Models;

namespace TecnicalTestApi.Services
{
    public class EmployeeStatusService
    {
        private readonly AppDbContext _context;
        public EmployeeStatusService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EmployeeStatus>> GetEmployeeStatusesAsync(string status)
        {
            return await _context.GetEmployeeStatuses(status);
        }
        public async Task SaveEmployeeStatus(EmployeeStatus status)
        {
            await _context.SaveEmployeeStatusAsync(status);
        }
        public async Task DeleteEmployeeStatus(int statusId)
        {
            await _context.DeleteEmployeeStatusAsync(statusId);
        }
    }
}

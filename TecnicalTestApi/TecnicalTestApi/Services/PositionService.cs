using TecnicalTestApi.Data;
using TecnicalTestApi.Models;

namespace TecnicalTestApi.Services
{
    public class PositionService
    {
        private readonly AppDbContext _context;
        public PositionService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Position>> GetPositionsAsync(string position)
        {
            return await _context.GetPositions(position);
        }
        public async Task SavePosition(Position position)
        {
            await _context.SavePositionAsync(position);
        }
        public async Task DeletePosition(int positionId)
        {
            await _context.DeletePositionAsync(positionId);
        }
    }
}

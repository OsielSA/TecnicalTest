using Microsoft.EntityFrameworkCore;
using TecnicalTestApi.Models;

namespace TecnicalTestApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<EmployeeStatus> EmployeeStatuses { get; set; }
        public DbSet<EmployeeDto> EmployeesDto { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");

            modelBuilder.Entity<EmployeeDto>().HasNoKey();

            modelBuilder.Entity<EmployeeStatus>()
                        .ToTable("EmployeesStatus")
                        .HasKey(e => e.StatusId);


            base.OnModelCreating(modelBuilder);

            // Configuración adicional (opcional) para tus tablas o relaciones aquí.
        }
        public async Task<List<EmployeeDto>> GetEmployeesAsync(string filterName = null, int? positionId = null)
        {
            var filterNameParam = new Npgsql.NpgsqlParameter("in_filter_name", filterName ?? String.Empty);
            var positionIdParam = new Npgsql.NpgsqlParameter("in_position_id", positionId.HasValue ? positionId.Value : (object)DBNull.Value);

            // Llamada a la función almacenada con parámetros
            return await this.Set<EmployeeDto>()
                             .FromSqlRaw("SELECT * FROM get_employees(@in_filter_name, @in_position_id)", filterNameParam, positionIdParam)
                             .ToListAsync();
        }
        public async Task<List<EmployeeStatus>> GetEmployeeStatuses()
        {

            // Llamada a la función almacenada con parámetros
            return await this.Set<EmployeeStatus>()
                             .FromSqlRaw("SELECT * FROM public.EmployeesStatus")
                             .ToListAsync();
        }

    }
}

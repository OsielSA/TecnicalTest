using Microsoft.EntityFrameworkCore;
using TecnicalTestApi.Models;

namespace TecnicalTestApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<EmployeeStatus> EmployeeStatuses { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");

            modelBuilder.Entity<Employee>()
                        .Ignore(e => e.RegistrationDate)
                        .HasKey(e => e.EmployeeId);

            modelBuilder.Entity<EmployeeStatus>()
                        .ToTable("EmployeesStatus")
                        .HasKey(e => e.StatusId);

            modelBuilder.Entity<Position>()
                        .ToTable("Positions")
                        .HasKey(e => e.PositionId);


            base.OnModelCreating(modelBuilder);

        }

        //Status Methods
        public async Task<List<EmployeeStatus>> GetEmployeeStatuses(string status)
        {
            var statusParam = new Npgsql.NpgsqlParameter("in_status", status ?? String.Empty);
            return await this.Set<EmployeeStatus>()
                             .FromSqlRaw("SELECT * FROM get_employeestatus(@in_status)", statusParam)
                             .ToListAsync();
        }
        public async Task SaveEmployeeStatusAsync(EmployeeStatus status)
        {
            var statusIdParam = new Npgsql.NpgsqlParameter("in_status_id", status.StatusId);
            var descriptionParam = new Npgsql.NpgsqlParameter("in_description", status.Description);

            await this.Database.ExecuteSqlRawAsync(
                "CALL public.save_employeestatus(@in_status_id, @in_description)",
                statusIdParam, descriptionParam
            );
        }
        public async Task DeleteEmployeeStatusAsync(int statusId)
        {
            var statusIdParam = new Npgsql.NpgsqlParameter("in_status_id", statusId);
            await this.Database.ExecuteSqlRawAsync( "CALL public.delete_employeestatus(@in_status_id)", statusIdParam );
        }
        //Positions Methods
        public async Task<List<Position>> GetPositions(string position)
        {
            var positionParam = new Npgsql.NpgsqlParameter("in_position", position ?? String.Empty);
            return await this.Set<Position>()
                             .FromSqlRaw("SELECT * FROM get_positions(@in_position)", positionParam)
                             .ToListAsync();
        }
        public async Task SavePositionAsync(Position position)
        {
            var positionIdParam = new Npgsql.NpgsqlParameter("in_position_id", position.PositionId);
            var descriptionParam = new Npgsql.NpgsqlParameter("in_description", position.Description);

            await this.Database.ExecuteSqlRawAsync(
                "CALL public.save_position(@in_position_id, @in_description)",
                positionIdParam, descriptionParam
            );
        }
        public async Task DeletePositionAsync(int positionId)
        {
            var positionIdParam = new Npgsql.NpgsqlParameter("in_position_id", positionId);
            await this.Database.ExecuteSqlRawAsync("CALL public.delete_position(@in_position_id)", positionIdParam);
        }


        //Employee Methods
        public async Task<List<Employee>> GetEmployeesAsync(string filterName = null, string? positionName = null, int? statusId = null)
        {
            var filterNameParam = new Npgsql.NpgsqlParameter("in_filter_name", filterName ?? String.Empty);
            var positionParam = new Npgsql.NpgsqlParameter("in_position_name", positionName ?? String.Empty);
            var statusParam = new Npgsql.NpgsqlParameter("in_status_id", statusId.HasValue ? (object)statusId.Value : DBNull.Value);

            return await this.Set<Employee>()
                             .FromSqlRaw("SELECT * FROM get_employees(@in_filter_name, @in_position_name, @in_status_id)", filterNameParam, positionParam, statusParam)
                             .ToListAsync();
        }
        public async Task SaveEmployeeAsync(Employee employee)
        {
            var employeeIdeParam = new Npgsql.NpgsqlParameter("in_employee_id", employee.EmployeeId);
            var firstNameParam = new Npgsql.NpgsqlParameter("in_firstname", employee.FirstName);
            var lastNameParam = new Npgsql.NpgsqlParameter("in_lastname", employee.LastName);
            var descriptionParam = new Npgsql.NpgsqlParameter("in_description", employee.Description);
            var positionIdParam = new Npgsql.NpgsqlParameter("in_position_id", employee.PositionId);
            var statusIdParam = new Npgsql.NpgsqlParameter("in_status_id", employee.StatusId);

            await this.Database.ExecuteSqlRawAsync(
                "CALL public.save_employee(@in_employee_id, @in_firstname, @in_lastname, @in_description, @in_position_id, @in_status_id)",
                employeeIdeParam, firstNameParam, lastNameParam, descriptionParam, positionIdParam, statusIdParam
            );
        }
        public async Task SetEmployeeStatusAsync(int employeeId, int statusId)
        {
            var employeeIdParam = new Npgsql.NpgsqlParameter("in_employee_id", employeeId);
            var statusIdParam = new Npgsql.NpgsqlParameter("in_status_id", statusId);

            await this.Database.ExecuteSqlRawAsync("CALL set_employeestatus(@in_employee_id, @in_status_id)",
                employeeIdParam, statusIdParam);
        }
    }
}

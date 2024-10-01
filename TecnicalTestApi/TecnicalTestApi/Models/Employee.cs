
namespace TecnicalTestApi.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public int PositionId { get; set; }
        public int StatusId { get; set; }
        public DateTime RegistrationDate { get; set; }

        // Relaciones
        public Position Position { get; set; }
        public EmployeeStatus Status { get; set; }
    }
}

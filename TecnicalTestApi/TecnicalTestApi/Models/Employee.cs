
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TecnicalTestApi.Models
{
    public class Employee
    {
        [Key]
        [Column("employee_id")]
        public int EmployeeId { get; set; }
        [Column("firstname")]
        public string FirstName { get; set; }
        [Column("lastname")]
        public string LastName { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("position_id")]
        public int PositionId { get; set; }
        [Column("status_id")]
        public int StatusId { get; set; }
        [JsonIgnore]
        public DateTime RegistrationDate { get; set; }

        // Relaciones
        //public Position Position { get; set; }
        //public EmployeeStatus Status { get; set; }
    }
}

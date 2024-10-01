using System.ComponentModel.DataAnnotations.Schema;

namespace TecnicalTestApi.Models
{
    public class EmployeeDto
    {
        [Column("employee_id")]
        public int EmployeeId { get; set; }
        [Column("firstname")]
        public string FirstName { get; set; }
        [Column("lastname")]
        public string LastName { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("position_desc")]
        public string Position { get; set; }
        [Column("status")]
        public string Status { get; set; }
        [Column("registration_date")]
        public DateTime RegistrationDate { get; set; }
    }
}

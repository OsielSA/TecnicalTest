using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TecnicalTestApi.Models
{
    [Table("EmployeesStatus")]
    public class EmployeeStatus
    {
        [Key]
        [Column("status_id")]
        public int StatusId { get; set; }
        [Column("description")]
        public string Description { get; set; }
    }
}

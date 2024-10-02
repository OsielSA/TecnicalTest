using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TecnicalTestApi.Models
{
    public class Position
    {
        [Key]
        [Column("position_id")]
        public int PositionId { get; set; }
        [Column("description")]
        public string Description { get; set; }
    }
}

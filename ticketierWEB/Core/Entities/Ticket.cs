using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ticketierWEB.Core.Entities
{
    public enum StadiumSector
    {
        Lindje = 0,
        Perendim = 1,
        Veri = 2,
        Jug = 3
    }

    public class Ticket
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public long? UserId { get; set; }

        [ForeignKey("UserId")]
        public Users? User { get; set; }

        public DateTime Time { get; set; }

        [Required]
        public StadiumSector Sector { get; set; }

        [Required]
        public int SeatNumber { get; set; }

        [Required]
        public int Price { get; set; }

        public string? SFirstName { get; set; }
        public string? SLastName { get; set; }

        public bool ISaSold { get; set; } = false;
        public DateTime? SoldAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }

}
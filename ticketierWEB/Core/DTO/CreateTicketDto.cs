using System.ComponentModel.DataAnnotations;
using ticketierWEB.Core.Entities;

namespace ticketierWEB.Core.DTO
{
    public class CreateTicketDto
    {
        [Required]
        public long? UserId { get; set; }

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
    }
}

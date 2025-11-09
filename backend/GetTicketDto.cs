using System;
using System.ComponentModel.DataAnnotations;

namespace ticketierWEB.Core.DTO
{
    public class GetTicketDto
    {
        public long UserId { get; set; }
        public DateTime Time { get; set; }
        public int SeatNumber { get; set; }
        public int Price { get; set; }
        public string? SFirstName { get; set; }
        public string? SLastName { get; set; }
    }
}
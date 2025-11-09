namespace ticketierWEB.Core.DTO
{
    public class UpdateTicketDto
    {
        public DateTime Time { get; set; }
        public int Price { get; set; }
        public string? SFirstName { get; set; }
        public string? SLastName { get; set; }
        public bool ISaSold { get; set; } = false;
        public DateTime? SoldAt { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace ticketierWEB.Core.Entities
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string CardLast4 { get; set; } = string.Empty;

        [Required]
        public string Expiry { get; set; } = string.Empty;

        [Required]
        public string CardholderName { get; set; } = string.Empty;

        [Required]
        public string Country { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string Status { get; set; } = "Pending";

        [Required]
        public string UserId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
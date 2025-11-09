using System.ComponentModel.DataAnnotations;

namespace ticketierWEB.Core.DTO
{
    public class CreatePaymentDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, RegularExpression(@"^\d{16}$", ErrorMessage = "Card number must be 16 digits")]
        public string CardNumber { get; set; } = string.Empty;

        [Required, RegularExpression(@"^(0[1-9]|1[0-2])\/\d{2}$", ErrorMessage = "Expiry must be in MM/YY format")]
        public string Expiry { get; set; } = string.Empty;

        [Required, RegularExpression(@"^\d{3,4}$", ErrorMessage = "CVC must be 3 or 4 digits")]
        public string CVC { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string CardholderName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Country { get; set; } = string.Empty;

        [Required, Range(1, 10000, ErrorMessage = "Amount must be between 1 and 10,000")]
        public decimal Amount { get; set; }
    }
}


using System;

namespace ticketierWEB.Core.DTO
{
    public class Refreshtoken
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string TokenId { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public bool? IsActive { get; set; } = true;
    }
}
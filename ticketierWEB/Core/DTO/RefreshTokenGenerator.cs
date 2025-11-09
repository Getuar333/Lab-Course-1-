using System.Security.Cryptography;
using ticketierWEB.Core.Context;
using ticketierWEB.Core.Entities;

namespace ticketierWEB.Core.DTO
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        private readonly ApplicationDbContext _context;

        public RefreshTokenGenerator(ApplicationDbContext context)
        {
            _context = context;
        }

        public string GenerateToken(string Username)
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);

            string refreshToken = Convert.ToBase64String(randomNumber);

            var existing = _context.Refreshtokens.FirstOrDefault(r => r.Id == Username);
            if (existing != null)
            {
                existing.RefreshToken = refreshToken;
                existing.IsActive = true;
                _context.SaveChanges();
            }
            else
            {
                var newToken = new Refreshtoken
                {
                    Id = Username,
                    TokenId = new Random().Next().ToString(),
                    RefreshToken = refreshToken,
                    IsActive = true
                };
                _context.Refreshtokens.Add(newToken);
                _context.SaveChanges();
            }

            return refreshToken;
        }
    }
}
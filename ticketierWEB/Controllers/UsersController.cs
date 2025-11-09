using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ticketierWEB.Core.Context;
using ticketierWEB.Core.DTO;
using ticketierWEB.Core.Entities;

namespace ticketierWEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JWTSetting _setting;
        private readonly IRefreshTokenGenerator _tokenGenerator;

        public UserController(ApplicationDbContext context, IOptions<JWTSetting> options, IRefreshTokenGenerator tokenGenerator)
        {
            _context = context;
            _setting = options.Value;
            _tokenGenerator = tokenGenerator;
        }

        private static string HashPassword(string password)
        {
            if (password == null) password = "";
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = SHA256.HashData(bytes);
            return Convert.ToBase64String(hash);
        }

        private TokenResponse GenerateToken(Users user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var tokenKey = Encoding.UTF8.GetBytes(_setting.securitykey);
            var tokenHandler = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
            );

            return new TokenResponse
            {
                JWTToken = new JwtSecurityTokenHandler().WriteToken(tokenHandler),
                RefreshToken = _tokenGenerator.GenerateToken(user.Id.ToString())
            };
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            if (_context.Users.Any(u => u.Email == dto.Email))
                return BadRequest(new APIResponse { Keycode = "Error", Result = "User already exists" });

            var user = new Users
            {
                Name = dto.Name ?? "",
                Email = dto.Email ?? "",
                PasswordHash = HashPassword(dto.Password ?? ""),
                Role = "User",
                IsActive = true,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(new APIResponse { Keycode = "Error", Result = ex.Message });
            }
            _tokenGenerator.GenerateToken(user.Id.ToString());
            return Ok(new APIResponse { Keycode = "Success", Result = "User registered" });
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody] UserCred dto)
        {
            var hashedPassword = HashPassword(dto.Password);
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email && u.PasswordHash == hashedPassword && u.IsActive);

            if (user == null)
                return Unauthorized(new APIResponse { Keycode = "Error", Result = "Invalid credentials" });

            var token = GenerateToken(user);

            return Ok(new
            {
                jwtToken = token.JWTToken,
                refreshToken = token.RefreshToken,
                userId = user.Id,
                email = user.Email
            });
        }
        [HttpPost("Refresh")]
        public IActionResult Refresh([FromBody] TokenResponse token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadJwtToken(token.JWTToken);
            var userId = securityToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var refToken = _context.Refreshtokens.FirstOrDefault(r => r.Id == userId
                                                          && r.RefreshToken == token.RefreshToken
                                                          && r.IsActive.GetValueOrDefault());
            if (refToken == null) return Unauthorized();

            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId);
            if (user == null) return Unauthorized();

            var newToken = GenerateToken(user);
            return Ok(newToken);
        }
        [Authorize]
        [HttpGet("AllUsers")]
        public IActionResult AllUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }
    }
}
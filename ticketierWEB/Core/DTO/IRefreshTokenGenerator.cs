using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ticketierWEB.Core.DTO
{
    public interface IRefreshTokenGenerator
    {
        string GenerateToken(string Username);
    }
}

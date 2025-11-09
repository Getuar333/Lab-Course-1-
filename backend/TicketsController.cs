using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ticketierWEB.Core.Context;
using ticketierWEB.Core.DTO;
using ticketierWEB.Core.Entities;
using ticketierWEB.Hubs;

namespace ticketierWEB.Controllers
{
    [Route("TicketierAPI/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHubContext<SeatHub> _hubContext;

        public TicketsController(ApplicationDbContext context, IMapper mapper, IHubContext<SeatHub> hubContext)
        {
            _context = context;
            _mapper = mapper;
            _hubContext = hubContext;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTicket([FromBody] CreateTicketDto createTicketDto)
        {
            // Kontrollo nëse UserId është null
            if (createTicketDto.UserId == null)
                return BadRequest("UserId nuk mund të jetë null.");

            long userId = createTicketDto.UserId.Value; // konverto nullable në long

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return BadRequest("UserId does not exist.");

            if (string.IsNullOrWhiteSpace(createTicketDto.SFirstName) ||
                !System.Text.RegularExpressions.Regex.IsMatch(createTicketDto.SFirstName, @"^[a-zA-Z\s]+$"))
                return BadRequest("First name can only contain letters and spaces.");

            if (string.IsNullOrWhiteSpace(createTicketDto.SLastName) ||
                !System.Text.RegularExpressions.Regex.IsMatch(createTicketDto.SLastName, @"^[a-zA-Z\s]+$"))
                return BadRequest("Last name can only contain letters and spaces.");

            if (!Enum.IsDefined(typeof(StadiumSector), (int)createTicketDto.Sector))
                return BadRequest("Invalid sector.");

            bool exists = await _context.Tickets.AnyAsync(t =>
                t.Sector == createTicketDto.Sector &&
                t.SeatNumber == createTicketDto.SeatNumber);

            if (exists)
                return BadRequest("This seat in this sector is already reserved.");

            var newTicket = _mapper.Map<Ticket>(createTicketDto);
            newTicket.UserId = userId; // sigurohu që nuk është null
            newTicket.ISaSold = true;
            newTicket.SoldAt = DateTime.UtcNow;

            await _context.Tickets.AddAsync(newTicket);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("UpdateSeatStatus", newTicket.SeatNumber.ToString(), true);

            return Ok(new
            {
                newTicket.Id,
                newTicket.Time,
                newTicket.Sector,
                newTicket.SeatNumber,
                newTicket.Price,
                newTicket.SFirstName,
                newTicket.SLastName,
                newTicket.ISaSold,
                newTicket.SoldAt,
                newTicket.CreatedAt,
                newTicket.UpdatedAt,
                newTicket.UserId
            });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetTicketDto>>> GetTickets(string? sorto)
        {
            IQueryable<Ticket> query = _context.Tickets;

            if (!string.IsNullOrWhiteSpace(sorto))
                query = query.Where(t => (t.SFirstName != null && t.SFirstName.Contains(sorto)) ||
                                         (t.SLastName != null && t.SLastName.Contains(sorto)));

            query = query.OrderBy(t => t.SFirstName);

            var tickets = await query
                .Select(t => new GetTicketDto
                {
                    Time = t.Time,
                    SeatNumber = t.SeatNumber,
                    Price = t.Price,
                    SFirstName = t.SFirstName,
                    SLastName = t.SLastName,
                    UserId = t.UserId ?? 0
                })
                .ToListAsync();

            return Ok(tickets);
        }
    }
}

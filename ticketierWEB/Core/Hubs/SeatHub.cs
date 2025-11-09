using Microsoft.AspNetCore.SignalR;

namespace ticketierWEB.Hubs
{
    public class SeatHub : Hub
    {
        private static readonly Dictionary<string, DateTime> LockedSeats = new();

        public async Task SelectSeat(string seatId)
        {
            lock (LockedSeats)
            {
                if (!LockedSeats.ContainsKey(seatId))
                {
                    LockedSeats[seatId] = DateTime.UtcNow.AddMinutes(3);
                }
            }

            await Clients.All.SendAsync("UpdateSeatStatus", seatId, true);
        }

        public async Task DeselectSeat(string seatId)
        {
            lock (LockedSeats)
            {
                if (LockedSeats.ContainsKey(seatId))
                {
                    LockedSeats.Remove(seatId);
                }
            }

            await Clients.All.SendAsync("UpdateSeatStatus", seatId, false);
        }

        public static void CleanupExpiredLocks()
        {
            lock (LockedSeats)
            {
                var expired = LockedSeats
                    .Where(x => x.Value < DateTime.UtcNow)
                    .Select(x => x.Key)
                    .ToList();

                foreach (var seatId in expired)
                {
                    LockedSeats.Remove(seatId);
                }
            }
        }
    }
}

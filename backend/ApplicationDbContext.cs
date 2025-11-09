using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ticketierWEB.Core.DTO;
using ticketierWEB.Core.Entities;

namespace ticketierWEB.Core.Context
{
    public partial class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Refreshtoken> Refreshtokens { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Ticket>().HasIndex(t => new { t.Sector, t.SeatNumber }).IsUnique();
            modelBuilder.Entity<Users>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Users");
                entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
                entity.Property(e => e.PasswordHash).HasMaxLength(255).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(150).IsRequired();
                entity.Property(e => e.Role).HasMaxLength(50).HasDefaultValue("User");
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
            });
            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Sector).IsRequired();
                entity.Property(t => t.SeatNumber).IsRequired();
                entity.Property(t => t.Price).IsRequired();
                entity.Property(t => t.ISaSold).HasDefaultValue(false);

                entity.HasOne(t => t.User)
                      .WithMany()
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.SetNull);
            });
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Payments");

                entity.Property(e => e.Amount)
                      .HasColumnType("decimal(18,2)")
                      .IsRequired();

                entity.Property(e => e.CardholderName).IsRequired();
                entity.Property(e => e.CardLast4).IsRequired();
                entity.Property(e => e.Country).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Expiry).IsRequired();
                entity.Property(e => e.Status).IsRequired();
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            });
            modelBuilder.Entity<Refreshtoken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Refreshtoken");

                entity.Property(e => e.TokenId)
                      .HasMaxLength(50)
                      .IsUnicode(false)
                      .IsRequired();
                entity.Property(e => e.RefreshToken)
                      .HasMaxLength(255)
                      .IsUnicode(false)
                      .IsRequired();

                entity.Property(e => e.IsActive)
                      .HasDefaultValue(true);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
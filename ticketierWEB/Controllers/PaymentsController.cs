using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ticketierWEB.Core.DTO;

namespace ticketierWEB.Controllers
{
    public class PaymentsController : Controller
    {
        // GET: PaymentsController
        public ActionResult Index()
        {
            return View();
        }

        // GET: PaymentsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PaymentsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PaymentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PaymentsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PaymentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PaymentsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PaymentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}

//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using ticketierWEB.Core.DTO;
//using ticketierWEB.Core.Services;
//using System.Security.Claims;

//namespace ticketierWEB.Controllers
//{
   // [Route("TicketierAPI/[controller]")]
    //[ApiController]
    //public class PaymentsController : ControllerBase
    //{
      //  private readonly IPaymentService _paymentService;

        //public PaymentsController(IPaymentService paymentService)
        //{
          //  _paymentService = paymentService;
        //}

//        [HttpPost("create")]
//        [Authorize]
//        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentDto dto)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            if (string.IsNullOrEmpty(userId))
//                return Unauthorized("User not found");

//            var payment = await _paymentService.CreatePaymentAsync(dto, userId);

//            return Ok(new
//            {
//                message = "Pagesa u krye me sukses",
//                paymentId = payment.Id,
//                last4 = payment.CardLast4,
//                amount = payment.Amount,
//                status = payment.Status,
//                createdAt = payment.CreatedAt
//            });
//        }
//    }
//}

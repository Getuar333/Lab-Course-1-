using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ticketierWEB.Controllers
{
    public class LigjeruesiController : Controller
    {
        // GET: LigjeruesiController
        public ActionResult Index()
        {
            return View();
        }

        // GET: LigjeruesiController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: LigjeruesiController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: LigjeruesiController/Create
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

        // GET: LigjeruesiController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: LigjeruesiController/Edit/5
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

        // GET: LigjeruesiController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: LigjeruesiController/Delete/5
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

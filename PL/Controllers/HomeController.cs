using Microsoft.AspNetCore.Mvc;
//using PL.ViewModels;
using System.Diagnostics;

namespace PL.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult index()
        {
            return View();
        }

        public IActionResult login()
        {
            return View();
        }

        public IActionResult signup()
        {
            return View();
        }

        public IActionResult about()
        {
            return View();
        }

        public IActionResult categories()
        {
            return View();
        }

        public IActionResult favourite()
        {
            return View();
        }

    }
}

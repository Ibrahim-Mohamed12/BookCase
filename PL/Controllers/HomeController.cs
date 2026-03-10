using Microsoft.AspNetCore.Mvc;
using BLL.Repository;
//using PL.ViewModels;
using System.Diagnostics;
using PL.ViewModels;
using BookCaseEF.Entities;
using BLL.Interfaces;

namespace PL.Controllers
{
    public class HomeController : Controller
    {
        readonly private IUserRepository _userRepository;

        public HomeController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IActionResult index()
        {
            if (HttpContext.Session.GetString("userRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName") ?? "user";

            return View();
        }

        #region Login


        [HttpGet]
        public IActionResult login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult login(LoginUserViewModel u)
        {
            if (!ModelState.IsValid)
            {
                return View(u);
            }

            var user = _userRepository.GetByEmail(u.Email);

            if (user != null && user.Password == u.Password)
            {
                if (user.isAdmin)
                {
                    HttpContext.Session.SetString("userRole", "admin");
                }
                else
                {
                    HttpContext.Session.SetString("userRole", "user");
                }
                HttpContext.Session.SetString("userId", user.UserID.ToString());
                HttpContext.Session.SetString("UserName", user.Name);

                return user.isAdmin ? RedirectToAction("admin", "Home") : RedirectToAction("index", "Home");
            }

            ModelState.AddModelError("", "Invalid Email or Password");

            return View(u);
        }

        public IActionResult logOut()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("index", "Home");
        }

        #endregion

        #region signup

        [HttpGet]
        public IActionResult signup()
        {
            return View();
        }

        [HttpPost]
        public IActionResult signup(SignUpUserViewModel u)
        {
            if (ModelState.IsValid)
            {
                var user = u.toUser();

                _userRepository.Add(user);

                return RedirectToAction("login");
            }

            return View(u);
        }

        #endregion
        public IActionResult about()
        {
            if (HttpContext.Session.GetString("UserRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName")
                               ?? "user"; return View();
        }

        public IActionResult categories()
        {
            if (HttpContext.Session.GetString("UserRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName")
                               ?? "user"; return View();
        }

        public IActionResult favourite()
        {
            if (HttpContext.Session.GetString("UserRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName")
                               ?? "user"; return View();
        }

    }
}

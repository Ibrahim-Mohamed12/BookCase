using BLL.Interfaces;
using BLL.Repository;
using BookCaseEF.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PL.ViewModels;
//using PL.ViewModels;
using System.Diagnostics;

namespace PL.Controllers
{
    public class HomeController : Controller
    {
        readonly private IUserRepository _userRepository;
        readonly private IGenericRepository<Category> _categoryRepository;
        readonly private IFavListRepository _favListRepository;
        readonly private IBookRepository _bookRepository;


        public HomeController(IUserRepository userRepository, IGenericRepository<Category> categoryRepository, IFavListRepository favListRepository, IBookRepository bookRepository)
        {
            _userRepository = userRepository;
            _categoryRepository = categoryRepository;
            _favListRepository = favListRepository;
            _bookRepository = bookRepository;
        }

        public IActionResult index()
        {
            if (HttpContext.Session.GetString("userRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName") ?? "user";

            var books = _bookRepository.GetAll();

            ViewBag.Books = books;

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

                return user.isAdmin ? RedirectToAction("Admin", "Admin") : RedirectToAction("index", "Home");
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
            List<string> emails = _userRepository.GetAllEmails();

            if (emails.Find(email => email == u.Email) != null)
            {
                ModelState.AddModelError("Email", "Email already exists.");
                return View(u);
            }

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
            if (HttpContext.Session.GetString("userRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName")
                               ?? "user"; return View();
        }


        [HttpGet]
        public IActionResult categories(string id)
        {

            if (HttpContext.Session.GetString("userRole") != "user")
                return RedirectToAction("login", "Home");

            var categoryDB = _categoryRepository.GetById(id);

            var category = categoryDB.toCategoryVM();

            ViewBag.category = category;

            var userID = HttpContext.Session.GetString("userId");

            var favlList = _favListRepository.GetAllFavListToSpecificUser(userID);

            ViewBag.favList = favlList;

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName")
                               ?? "user"; return View();
        }

        [HttpPost]
        public IActionResult AddBookToFavlist(string BookID, string FavID)
        {
            int result = _favListRepository.AddBookToFavList(BookID, FavID);

            return RedirectToAction("favourite", "Home");

        }

        public IActionResult favourite()
        {
            string id = HttpContext.Session.GetString("userId");
            var favlists = _favListRepository.GetAllFavListToSpecificUser(id);

            ViewBag.favlists = favlists;

            if (HttpContext.Session.GetString("userRole") != "user")
                return RedirectToAction("login", "Home");

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName")
                               ?? "user"; return View();
        }

        [HttpGet]
        public IActionResult deleteBookFromFavList(string BookID, string FavID)
        {
            _favListRepository.DeleteBookFromFavList(BookID, FavID);

            ViewBag.favlistID = FavID;

            return RedirectToAction("FavBooks", "Home", new { id = FavID });
        }

        [HttpGet]
        public IActionResult FavBooks(string id)
        {

            var favlist = _favListRepository.GetById(id);

            ViewBag.favlistID = favlist.FavID;

            // Pass the name directly to ViewBag
            ViewBag.UserName = HttpContext.Session.GetString("UserName") ?? "user";

            return View(favlist.toFavListVW());
        }

        #region AddFavList


        [HttpGet]
        public IActionResult AddFavList()
        {
            ViewBag.UserId = HttpContext.Session.GetString("userId") ?? "none";

            return View();
        }

        [HttpPost]
        public IActionResult AddFavList(AddFavListViewModel a)
        {
            if (!ModelState.IsValid)
            {
                return View(a);
            }

            var favlist = a.toFavList();

            _favListRepository.Add(favlist);

            return RedirectToAction("favourite", "Home");
        }

        #endregion
    }
}

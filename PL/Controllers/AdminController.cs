using BLL.Interfaces;
using BookCaseEF.Entities;
using Microsoft.AspNetCore.Mvc;
using PL.ViewModels;

namespace PL.Controllers
{
    public class AdminController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IFavListRepository _favListRepository;
        private readonly IGenericRepository<Category> _categoryRepository;


        public AdminController(IUserRepository userRepository, IBookRepository bookRepository, IFavListRepository favListRepository, IGenericRepository<Category> categoryRepository)
        {
            _userRepository = userRepository;
            _bookRepository = bookRepository;
            _favListRepository = favListRepository;
            _categoryRepository = categoryRepository;
        }

        public IActionResult Admin()
        {
            ViewBag.NOfUsers = _userRepository.GetNOfUsers();

            ViewBag.NOfBooks = _bookRepository.CountBooks();

            ViewBag.NOfFavBooks = _favListRepository.GetNOfAllBooksToAllUsers();

            var books = _bookRepository.GetAll();

            var users = _userRepository.GetAll();

            ViewBag.Users = users;

            ViewBag.Books = books;

            return View();
        }

        #region AddBook

        [HttpGet]
        public IActionResult AddBooks()
        {
            var categories = _categoryRepository.GetAll();

            ViewBag.CategoryList = categories;

            return View();
        }

        [HttpPost]
        public IActionResult AddBooks(AddBookViewModel b)
        {
            if (ModelState.IsValid)
            {
                var book = b.toBook();

                _bookRepository.Add(book);

                return RedirectToAction("Admin");
            }

            return View(b);
        }

        #endregion



    }
}

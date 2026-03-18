using BLL.Interfaces;
using BookCaseEF.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
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

            var books = _bookRepository.GetTop10();

            var users = _userRepository.GetTop10();

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
            if (b.BookFile == null || b.BookFile.Length == 0)
            {
                ModelState.AddModelError("BookFile", "Please upload a book file.");
            }

            if (ModelState.IsValid)
            {
                var book = b.toBook();

                if (b.BookFile != null && b.BookFile.Length > 0)
                {
                    // Get a unique file name
                    var fileName = Path.GetFileNameWithoutExtension(b.BookFile.FileName);
                    var extension = Path.GetExtension(b.BookFile.FileName);
                    var uniqueFileName = $"{fileName}_{Guid.NewGuid()}{extension}";

                    // Path to save the file (wwwroot/uploads)
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        b.BookFile.CopyTo(stream);
                    }

                    // Save the relative path in the database
                    book.Filepath = "/uploads/" + uniqueFileName;
                }

                _bookRepository.Add(book);

                return RedirectToAction("Admin");
            }

            return View(b);
        }

        #endregion

        #region Update Book

        [HttpGet]
        public IActionResult UpdateBooks(string id)
        {
            var book = _bookRepository.GetById(id);

            var categories = _categoryRepository.GetAll();

            ViewBag.CategoryList = categories;

            var b = book.toEditBookVW();

            return View(b);
        }

        [HttpPost]
        public IActionResult UpdateBooks(EditBookViewModel b)
        {
            if (b.BookFile == null || b.BookFile.Length == 0)
            {
                ModelState.AddModelError("BookFile", "Please upload a book file.");
            }

            // Get the existing book from the database
            var existingBook = _bookRepository.GetById(b.BookID);
            if (existingBook == null)
                return NotFound();

            if (ModelState.IsValid)
            {
                // Update fields
                var book = b.toBook();

                // Handle file upload
                if (b.BookFile != null && b.BookFile.Length > 0)
                {
                    if (!string.IsNullOrEmpty(existingBook.Filepath))
                    {
                        var oldFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", existingBook.Filepath.TrimStart('/'));


                        // D:\Visual Studio Projects\PL\wwwroot\uploads\Assignment 1_614d5f86-f7f7-46e0-82dd-29132d9af5a4.pdf

                        if (System.IO.File.Exists(oldFile))
                        {
                            System.IO.File.Delete(oldFile);
                        }
                    }

                    var fileName = Path.GetFileNameWithoutExtension(b.BookFile.FileName);
                    var extension = Path.GetExtension(b.BookFile.FileName);
                    var uniqueFileName = $"{fileName}_{Guid.NewGuid()}{extension}";

                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        b.BookFile.CopyTo(stream);
                    }

                    existingBook.Filepath = "/uploads/" + uniqueFileName;
                }

                _bookRepository.Update(existingBook);

                return RedirectToAction("Admin");
            }

            return View(b);
        }


        #endregion

        #region Delete Book

        [HttpGet]
        public IActionResult DeleteBooks(string id)
        {
            var book = _bookRepository.GetById(id);

            var categories = _categoryRepository.GetAll();

            ViewBag.CategoryList = categories;

            var b = book.toDeleteBookVW();

            return View(b);
        }

        [HttpPost]
        public IActionResult DeleteBooks(DeleteBookViewModel b)
        {
            if (!ModelState.IsValid)
            {
                return View(b);
            }

            // Get the book entity from the database first
            var Vbook = _bookRepository.GetById(b.BookID);

            var book = b.toBook();

            if (book == null)
            {
                // Book not found
                return NotFound();
            }

            // Delete the file if it exists
            if (!string.IsNullOrEmpty(book.Filepath))
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", book.Filepath.TrimStart('/'));

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            // Delete the book from the repository/database
            _bookRepository.Delete(book.BookID);

            return RedirectToAction("Admin", "Admin");
        }

        #endregion

        #region Delete User

        [HttpGet]
        public IActionResult DeleteUser(string id)
        {
            var user = _userRepository.GetById(id);
            if (user != null)
            {
                _userRepository.Delete(user.UserID);
            }

            return RedirectToAction("Admin", "Admin");
        }

        #endregion

        public IActionResult manageBooks()
        {
            var books = _bookRepository.GetAll();

            ViewBag.Books = books;

            return View();
        }

        public IActionResult manageUsers()
        {
            var user = _userRepository.GetAll();

            ViewBag.Users = user;

            return View();
        }
    }
}

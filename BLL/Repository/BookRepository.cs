using BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookCaseEF.Entities;
using BookCaseEF.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace BLL.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly BookCaseDBContext _context;

        public BookRepository(BookCaseDBContext context)
        {
            _context = context;
        }

        public int Add(Book entity)
        {
            _context.Book.Add(entity);
            return _context.SaveChanges();
        }
        public int Update(Book entity)
        {
            _context.Book.Update(entity);
            return _context.SaveChanges();
        }

        public int Delete(string id)
        {
            _context.Book.Remove(_context.Book.Find(id));
            return _context.SaveChanges();
        }

        public IEnumerable<Book> GetAll()
        {
            List<Book> books = _context.Book
                .AsNoTracking()
                .Include(b => b.Category) // Include the related Category entity
                .ToList();
            return books;
        }

        public IEnumerable<Book> GetBooksByCategoryID(string categoryId)
        {
            List<Book> books = _context.Book
                .Where(b => b.CategoryID == categoryId)
                .ToList();
            return books;
        }

        public Book GetById(string id)
        {
            Book book = _context.Book
                .Include(b => b.Category) // Include the related Category entity
                .FirstOrDefault(b => b.BookID == id);
            return book;
        }

        public int CountBooks()
        {
            List<Book> books = _context.Book
                .AsNoTracking()
                .ToList();
            return books.Count;
        }

        public IEnumerable<Book> GetTop10()
        {
            List<Book> books = _context.Book
                .AsNoTracking()
                .Take(10)
                .ToList();

            return books;
        }
    }
}

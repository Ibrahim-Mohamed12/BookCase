using BLL.Interfaces;
using BookCaseEF.Data.Context;
using BookCaseEF.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repository
{
    public class FavListRepository : IFavListRepository
    {
        private readonly BookCaseDBContext _context;

        public FavListRepository(BookCaseDBContext context)
        {
            _context = context;
        }

        public int Add(FavList entity)
        {
            _context.FavList.Add(entity);
            return _context.SaveChanges();
        }

        public int Delete(string id)
        {
            _context.FavList.Remove(_context.FavList.Find(id));
            return _context.SaveChanges();
        }

        public IEnumerable<FavList> GetAll()
        {
            List<FavList> favLists = _context.FavList
                .AsNoTracking()
                .ToList();

            return favLists;
        }

        public int GetNOfAllBooksToAllUsers()
        {
            List<FavList> favLists = _context.FavList
                .AsNoTracking()
                .Include(b => b.books)
                .ToList();

            int count = 0;

            foreach (FavList fav in favLists)
            {
                foreach (Book book in fav.books)
                {
                    count++;
                }
            }

            return count;
        }

        public List<FavList> GetAllFavListToSpecificUser(string id)
        {
            List<FavList> favLists = _context.FavList
              .AsNoTracking()
              .Where(f => f.UserID == id)
              .ToList();

            return favLists;
        }


        public FavList GetById(string id)
        {
            var favlist = _context.FavList
                          .AsNoTracking()
                          .Where(f => f.FavID == id)
                          .Include(f => f.books)
                          .ThenInclude(b => b.Category)
                          .FirstOrDefault();

            return favlist;
        }

        public int AddBookToFavList(string bookId, string favListId)
        {
            var favList = _context.FavList
                .Include(f => f.books)
                .FirstOrDefault(f => f.FavID == favListId);

            var book = _context.Book
                .FirstOrDefault(b => b.BookID == bookId);

            // prevent duplicate
            if (!favList.books.Any(b => b.BookID == bookId))
            {
                favList.books.Add(book);
            }

            return _context.SaveChanges();
        }

        public int DeleteBookFromFavList(string bookId, string favListId)
        {
            var favList = _context.FavList
                .Include(f => f.books)
                .FirstOrDefault(f => f.FavID == favListId);

            var book = favList.books
                .FirstOrDefault(b => b.BookID == bookId);

            favList.books.Remove(book);

            return _context.SaveChanges();
        }



        public int Update(FavList entity)
        {
            _context.FavList.Update(entity);
            return _context.SaveChanges();
        }
    }
}

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
    public class UserRepository : IUserRepository
    {
        private readonly BookCaseDBContext _context;

        public UserRepository(BookCaseDBContext context)
        {
            _context = context;
        }

        public int Add(User entity)
        {
            _context.User.Add(entity);
            return _context.SaveChanges();
        }

        public int Delete(string id)
        {
            _context.User.Remove(_context.User.Find(id));
            return _context.SaveChanges();
        }

        public int Update(User entity)
        {
            _context.User.Update(entity);
            return _context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            List<User> users = _context.User
                .AsNoTracking()
                .ToList();
            return users;
        }

        public User GetById(string id)
        {
            User user = _context.User
                .AsNoTracking()
                .Include(u => u.favLists) // Include the related FavoriteBooks collection
                .FirstOrDefault(u => u.UserID == id);
            return user;
        }

        public User GetByEmail(string Email)
        {
            User user = _context.User
                .AsNoTracking()
                .FirstOrDefault(u => u.Email == Email);

            return user;
        }
        public User GetUserFavListBooks(string id)
        {
            User user = _context.User
                .AsNoTracking()
                .Include(u => u.favLists) // Include the related FavoriteBooks collection
                .ThenInclude(f => f.books) // Include the related Books collection within each FavoriteBooks
                .FirstOrDefault(u => u.UserID == id);
            return user;
        }

        public int GetNOfUsers()
        {
            List<User> users = _context.User
               .AsNoTracking()
               .ToList();
            return users.Count;
        }


    }
}

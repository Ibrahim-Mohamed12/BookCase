using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using BookCaseEF.Data.Context;
using BookCaseEF.Entities;
using Microsoft.EntityFrameworkCore;

namespace BLL.Repository
{
    public class CategoryRepository : IGenericRepository<Category>
    {
        private readonly BookCaseDBContext _context;

        public CategoryRepository(BookCaseDBContext context)
        {
            _context = context;
        }
        public int Add(Category entity)
        {
            _context.category.Add(entity);
            return _context.SaveChanges();
        }

        public int Delete(string id)
        {
            _context.category.Remove(_context.category.Find(id));
            return _context.SaveChanges();
        }

        public IEnumerable<Category> GetAll()
        {
            List<Category> categories = _context.category
                .AsNoTracking()
                .ToList();
            return categories;
        }

        public Category GetById(string id)
        {
            Category category = _context.category
                .AsNoTracking()
                .Include(c => c.books) // Include the related Books collection
                .FirstOrDefault(c => c.CategoryID == id);
            return category;
        }

        public int Update(Category entity)
        {
            _context.category.Update(entity);
            return _context.SaveChanges();
        }
    }
}

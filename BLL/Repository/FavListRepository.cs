using BLL.Interfaces;
using BookCaseEF.Data.Context;
using BookCaseEF.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Repository
{
    public class FavListRepository : IGenericRepository<FavList>
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
            throw new NotImplementedException();
        }

        public FavList GetById(string id)
        {
            throw new NotImplementedException();
        }

        public int Update(FavList entity)
        {
            _context.FavList.Update(entity);
            return _context.SaveChanges();
        }
    }
}

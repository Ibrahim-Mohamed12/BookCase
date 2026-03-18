using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookCaseEF.Entities;

namespace BLL.Interfaces
{
    public interface IBookRepository : IGenericRepository<Book>
    {
        public IEnumerable<Book> GetBooksByCategoryID(string categoryId);

        public int CountBooks();
        public IEnumerable<Book> GetTop10();

    }
}

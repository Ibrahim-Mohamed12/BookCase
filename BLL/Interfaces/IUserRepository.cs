using BookCaseEF.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public User GetUserFavListBooks(string id);

        public User GetByEmail(string email);

        public int GetNOfUsers();

        public IEnumerable<User> GetTop10();

        public List<string> GetAllEmails();
    }
}

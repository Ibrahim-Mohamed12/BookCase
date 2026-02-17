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
    }
}

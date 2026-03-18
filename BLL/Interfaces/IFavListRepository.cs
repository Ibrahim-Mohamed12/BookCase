using BookCaseEF.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IFavListRepository : IGenericRepository<FavList>
    {
        public int GetNOfAllBooksToAllUsers();

        public List<FavList> GetAllFavListToSpecificUser(string id);

        public int AddBookToFavList(string bookId, string favListId);

        public int DeleteBookFromFavList(string bookId, string favListId);


    }
}

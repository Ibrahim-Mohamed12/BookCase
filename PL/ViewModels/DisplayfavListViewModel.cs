using BookCaseEF.Entities;

namespace PL.ViewModels
{
    public class DisplayfavListViewModel
    {
        public string FavName { get; set; }

        public int NOfBooks { get; set; }

        // Relations
        public ICollection<Book> books { get; set; } = new List<Book>();
    }

    public static class FavListExtension
    {
        public static DisplayfavListViewModel toFavListVW(this FavList f)
        {
            return new DisplayfavListViewModel
            {
                FavName = f.FavName,
                NOfBooks = f.NOfBooks,
                books = f.books
            };
        }
    }
}

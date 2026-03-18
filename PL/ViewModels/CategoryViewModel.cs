using BookCaseEF.Entities;

namespace PL.ViewModels
{
    public class CategoryViewModel
    {
        public string CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string Description { get; set; }

        public ICollection<Book> books { get; set; } = new HashSet<Book>();

    }

    public static class CategoryExtensions
    {
        public static CategoryViewModel toCategoryVM(this Category c)
        {
            return new CategoryViewModel
            {
                CategoryID = c.CategoryID,
                CategoryName = c.CategoryName,
                Description = c.Description,
                books = c.books,
            };
        }
    }
}

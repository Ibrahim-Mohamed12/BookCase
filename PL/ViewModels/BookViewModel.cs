using BookCaseEF.Entities;
using System.ComponentModel.DataAnnotations;

namespace PL.ViewModels
{
    public class BookViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Author { get; set; }

        public string ImageURL { get; set; }

        public string Filepath { get; set; }

        // Relations
        public string CategoryID { get; set; } // Foreign key
    }

    public static class BookExtension
    {
        public static BookViewModel toBookVW(this Book b)
        {
            return new BookViewModel
            {
                Title = b.Title,
                Description = b.Description,
                Author = b.Author,
                ImageURL = b.ImageURL,
                Filepath = b.Filepath,
                CategoryID = b.CategoryID,
            };
        }
    }
}

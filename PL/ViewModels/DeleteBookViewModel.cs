using BookCaseEF.Entities;
using System.ComponentModel.DataAnnotations;

namespace PL.ViewModels
{
    public class DeleteBookViewModel
    {
        public string BookID { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(2, ErrorMessage = "Book Title must be more than 1 charachter")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MaxLength(200)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Author Name is required")]
        [MaxLength(30)]
        public string Author { get; set; }

        [Required(ErrorMessage = "Image Url is required")]
        [MaxLength(200)]
        public string ImageURL { get; set; }

        public string Filepath { get; set; }
        // Relations

        public string CategoryID { get; set; } // Foreign key
    }

    public static class DeleteBookExtensions
    {
        public static Book toBook(this DeleteBookViewModel b)
        {
            return new Book
            {
                BookID = b.BookID,
                Title = b.Title,
                Description = b.Description,
                Author = b.Author,
                ImageURL = b.ImageURL,
                CategoryID = b.CategoryID,
                Filepath = b.Filepath,
            };
        }

        public static DeleteBookViewModel toDeleteBookVW(this Book b)
        {
            return new DeleteBookViewModel
            {
                BookID = b.BookID.ToString(),
                Title = b.Title,
                Description = b.Description,
                Author = b.Author,
                ImageURL = b.ImageURL,
                CategoryID = b.CategoryID,
                Filepath = b.Filepath,
            };
        }

    }
}

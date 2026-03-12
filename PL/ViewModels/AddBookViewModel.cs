using BookCaseEF.Entities;
using System.ComponentModel.DataAnnotations;

namespace PL.ViewModels
{
    public class AddBookViewModel
    {
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

        // Relations
        public string CategoryID { get; set; } // Foreign key

    }

    public static class BookExtensions
    {
        public static Book toBook(this AddBookViewModel b)
        {
            return new Book
            {
                BookID = Guid.NewGuid().ToString(),
                Title = b.Title,
                Description = b.Description,
                Author = b.Author,
                ImageURL = b.ImageURL,
                CategoryID = b.CategoryID,
            };
        }


        //public static UserViewModel toUserViewModel(this User u) {

        //    return new SignUpUserViewModel
        //    {
        //        UserID = u.UserID,
        //        Name = u.Name,
        //        Email = u.Email,
        //        Password = u.Password,
        //        isAdmin = u.isAdmin,
        //    };
        //}
    }
}

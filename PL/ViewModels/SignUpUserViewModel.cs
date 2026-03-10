// using Data annotation
using BookCaseEF.Entities;
using System.ComponentModel.DataAnnotations;

namespace PL.ViewModels
{
    public class SignUpUserViewModel
    {

        [Required]
        [MinLength(10, ErrorMessage = "Name must be at least 10 character")]
        [MaxLength(30)]
        public string Name { get; set; } // 30

        [Required]
        [MinLength(11, ErrorMessage = "Email must be at least 15 character")]
        [MaxLength(30)]
        public string Email { get; set; } // 20


        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; }

        [Required]
        public bool isAdmin { get; set; }
    }

    public static class MappingExtensions
    {
        public static User toUser(this SignUpUserViewModel u)
        {
            return new User
            {
                UserID = Guid.NewGuid().ToString(),
                Name = u.Name,
                Email = u.Email,
                Password = u.Password,
                isAdmin = u.isAdmin,
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

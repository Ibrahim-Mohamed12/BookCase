using System.ComponentModel.DataAnnotations;

namespace PL.ViewModels
{
    public class LoginUserViewModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(30)]
        [MinLength(11, ErrorMessage = "Email must be at least 15 character")]
        public string Email { get; set; } // 20

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; }

    }
}

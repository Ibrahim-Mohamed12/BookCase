using BookCaseEF.Entities;

namespace PL.ViewModels
{
    public class EditUserViewModel
    {
        public string UserID { get; set; }
        public string Name { get; set; } // 30

        public string Email { get; set; } // 20

        public string Password { get; set; }

        public bool isAdmin { get; set; }
    }

    public static class EditUserExtensions
    {
        public static User toUser(this EditUserViewModel u)
        {
            return new User
            {
                UserID = u.UserID,
                Name = u.Name,
                Email = u.Email,
                Password = u.Password,
                isAdmin = u.isAdmin,
            };
        }
    }
}

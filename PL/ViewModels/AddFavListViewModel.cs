using BookCaseEF.Entities;
using System.ComponentModel.DataAnnotations;

namespace PL.ViewModels
{
    public class AddFavListViewModel
    {

        [Required]
        [MaxLength(30, ErrorMessage = "FavList name must be less than 30")]
        public string FavName { get; set; }

        // Relations
        public string UserID { get; set; }
    }

    public static class FavlistExtension
    {
        public static FavList toFavList(this AddFavListViewModel f)
        {
            return new FavList
            {
                FavID = Guid.NewGuid().ToString(),
                FavName = f.FavName,
                UserID = f.UserID,
            };
        }

    }
}


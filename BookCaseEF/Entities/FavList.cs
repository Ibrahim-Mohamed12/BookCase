using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCaseEF.Entities
{
    public class FavList
    {
        public string FavID { get; set; }

        public string FavName { get; set; }

        public int NOfBooks { get; set; }

        // Relations
        public string UserID { get; set; }

        public User user { get; set; } // Navigation Property

        public ICollection<Book> books { get; set; } = new HashSet<Book>();
    }
}

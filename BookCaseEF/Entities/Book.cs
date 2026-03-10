using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCaseEF.Entities
{
    public class Book
    {

        public string BookID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Author { get; set; }

        public string ImageURL { get; set; }


        // Relations

        public string CategoryID { get; set; } // Foreign key

        public Category Category { get; set; } // Navigation Property

        public ICollection<FavList> favLists { get; set; } = new HashSet<FavList>();

    }
}

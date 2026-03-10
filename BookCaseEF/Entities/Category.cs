using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCaseEF.Entities
{
    public class Category
    {
        public string CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string Description { get; set; }

        // Relations
        public ICollection<Book> books { get; set; } = new HashSet<Book>();
    }
}

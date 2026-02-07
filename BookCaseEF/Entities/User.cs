using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCaseEF.Entities
{
    internal class User
    {
        public string UserID { get; set; }
        public string Name { get; set; } // 30

        public string Email { get; set; } // 20

        public string Password { get; set; }

        public bool isAdmin { get; set; }

        // Relations
        public ICollection<FavList> favLists { get; set; } = new HashSet<FavList>();
    }
}

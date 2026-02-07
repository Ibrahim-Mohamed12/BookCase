using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using BookCaseEF.Entities;
using System.Text;
using System.Threading.Tasks;

namespace BookCaseEF.Data.Context
{
    internal class BookCaseDBContext : DbContext
    {
        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = QNQ; Database = BookCase; Trusted_Connection = True; Encrypt = False");
        }

        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        DbSet<Book> Book;
        DbSet<User> User;
        DbSet<FavList> FavList;
        DbSet<Category> category;
    }
}

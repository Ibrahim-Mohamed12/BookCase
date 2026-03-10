using Microsoft.EntityFrameworkCore;
using System.Reflection;
using BookCaseEF.Entities;

namespace BookCaseEF.Data.Context
{
    public class BookCaseDBContext : DbContext
    {
        public BookCaseDBContext(DbContextOptions<BookCaseDBContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<Book> Book { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<FavList> FavList { get; set; }
        public DbSet<Category> category { get; set; }
    }
}
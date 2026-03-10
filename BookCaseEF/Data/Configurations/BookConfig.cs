using System;
using BookCaseEF.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookCaseEF.Data.Configurations
{
    public class BookConfig : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.HasKey(b => b.BookID);
            builder.Property(b => b.Title)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(b => b.Description)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(b => b.Author)
                .IsRequired()
                .HasMaxLength(30);
            builder.Property(b => b.ImageURL)
                .IsRequired()
                .HasMaxLength(200);
            // Relations
            builder.HasOne(b => b.Category)
                .WithMany(c => c.books)
                .HasForeignKey(b => b.CategoryID);
        }
    }
}

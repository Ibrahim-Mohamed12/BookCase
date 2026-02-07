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
    internal class CategoryConfig : IEntityTypeConfiguration<Category>
    {
        public void Configure (EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.CategoryID);
            builder.Property(c => c.CategoryName)
                .IsRequired()
                .HasMaxLength(30);
            builder.Property(c => c.Description)
                .IsRequired()
                .HasMaxLength(200);
            // Relations
            builder.HasMany(c => c.books)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryID);
        }
    }
}

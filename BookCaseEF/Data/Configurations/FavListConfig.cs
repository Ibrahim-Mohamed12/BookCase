using Microsoft.EntityFrameworkCore;
using BookCaseEF.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookCaseEF.Data.Configurations
{
    internal class FavListConfig : IEntityTypeConfiguration<FavList>
    {
        public void Configure (EntityTypeBuilder<FavList> builder)
        {
            builder.HasKey(f => f.FavID);

            builder.Property(f => f.FavName)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(f => f.NOfBooks)
                .IsRequired();

            // Relations

            builder.HasMany(f => f.books)
                .WithMany(b => b.favLists)
                .UsingEntity(j => j.ToTable("FavListBooks"));

        }
    }
}

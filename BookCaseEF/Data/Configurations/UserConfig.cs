using Microsoft.EntityFrameworkCore;
using System;
using BookCaseEF.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookCaseEF.Data.Configurations
{
    internal class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure (EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.UserID);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(u => u.Password)
                .IsRequired();

            builder.Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(u => u.isAdmin)
                .IsRequired()
                .HasColumnType("bit");

            builder
                .HasMany(u => u.favLists)
                .WithOne(f => f.user)
                .HasForeignKey(f => f.UserID);
        }
    }
}

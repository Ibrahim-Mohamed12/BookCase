using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    // where T : Icomparable<T> Secondary Constraint to ensure T can be compared (useful for sorting, etc.)
    // where T : Player or Another inherite class (not sealed) Special Primary Constraint to ensure T is a Player or derived from Player
    // General Primary constraint to ensure T is a reference type (class) 
    public interface IGenericRepository<T> where T : class
    {
        // T is used as the parameter type
        int Add(T entity);
        int Update(T entity);
        int Delete(string id); // Note: For a single ID, sometimes 'object' is used for flexibility across different primary key types like int, string, etc.
        T GetById(string id); // Or more specifically <Tid> Tid id
        IEnumerable<T> GetAll();
    }
}

using OrmFundamentalsDemo.Models;
using System;
using System.Linq;

namespace OrmFundamentalsDemo
{
    class Program
    {
        //dotnet ef dbcontext scaffold "Server=.;Database=SoftUni;Integrated Security = true;" Microsoft.EntityFrameworkCore.SqlServer -o Models
        static void Main(string[] args)
        {
            var db = new SoftUniContext();
            Console.WriteLine(db.Employees.Count());
        }
    }
}

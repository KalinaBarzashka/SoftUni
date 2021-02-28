using Microsoft.Data.SqlClient;
using System;

namespace CSharpDbDemo
{
    class Program
    {
        //SELECT Count(*) FROM Employees
        //UPDATE Employees SET Salary = Salary + 0.12 WHERE FirstName LIKE 'N%'
        //SELECT SUM(Salary)/12.0 FROM Employees
        static void Main(string[] args)
        {
            using (var connection = new SqlConnection("Server=.;Database=SoftUni;Integrated Security=true"))
            {
                connection.Open();
                string query = "SELECT d.Name, COUNT(*) AS Count " +
                    "FROM Employees e " +
                    "JOIN Departments d ON e.DepartmentId = d.DepartmentId " +
                    "GROUP BY d.Name ";

                SqlCommand sqlCommand = new SqlCommand(query, connection);
                using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                {
                    while (sqlDataReader.Read())
                    {
                        Console.WriteLine($"{sqlDataReader["Name"]} => {sqlDataReader["Count"]}");
                    }
                }
            }

        }
    }
}

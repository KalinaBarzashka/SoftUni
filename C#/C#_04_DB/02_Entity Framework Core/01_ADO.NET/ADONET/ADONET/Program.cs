namespace ADONET
{
    using System;
    using System.Collections.Generic;
    using Microsoft.Data.SqlClient;

    public class Program
    {
        const string SqlConnectionString = "Server=.;Database=MinionsDB;Integrated Security=True;";

        static void Main(string[] args)
        {
            using (var connection = new SqlConnection(SqlConnectionString))
            {
                connection.Open();
                //1. Initial Setup 
                //InitialSetup(connection);

                //2. Villain Names
                //GetVillainNames(connection);

                //3. Minion Names
                //MinionNames(connection);

                //4. Add Minion
                //AddMinion(connection);

                //5. Change Town Names Casing
                //ChangeTownnamesCasing(connection);

                //6. Remove Villain
                //RemoveVillain(connection);

                //7. Print All Minion Names
                //PrintAllMinionNames(connection);

                //8. Increase Minion Age
                //IncreaseMinionAge(connection);

                //9. Increase Age Stored Procedure
                IncreaseMinionAgeProc(connection);
            }

            static void IncreaseMinionAgeProc(SqlConnection connection)
            {
                int id = int.Parse(Console.ReadLine());
                string queryProc = @"EXEC usp_GetOlder @id";
                using (var sqlCommand = new SqlCommand(queryProc, connection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    sqlCommand.ExecuteNonQuery();
                }

                string queryGetMinion = "SELECT Name, Age FROM Minions WHERE Id = @Id";
                using (var sqlCommand = new SqlCommand(queryGetMinion, connection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    using var reader = sqlCommand.ExecuteReader();
                    while (reader.Read())
                    {
                        Console.WriteLine($"{reader["Name"]} – {reader["Age"]} years old");
                    }
                }
            }
        }

        private static void IncreaseMinionAge(SqlConnection connection)
        {
            string[] minionIds = Console.ReadLine().Split(' ');
            foreach (var minionId in minionIds)
            {
                string updateQuery = @"UPDATE Minions
                                           SET Name = UPPER(LEFT(Name, 1)) + SUBSTRING(Name, 2, LEN(Name)), Age += 1
                                           WHERE Id = @Id";
                using (var sqlCommand = new SqlCommand(updateQuery, connection))
                {
                    sqlCommand.Parameters.AddWithValue("@Id", minionId);
                    sqlCommand.ExecuteNonQuery();
                }
            }

            string minionsQuery = "SELECT Name, Age FROM Minions";
            using (var sqlCommand = new SqlCommand(minionsQuery, connection))
            {
                using var reader = sqlCommand.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"{reader["Name"]} {reader["Age"]}");
                }
            }
        }

        private static void PrintAllMinionNames(SqlConnection connection)
        {
            string getMinionsNamesQuery = "SELECT Name FROM Minions";
            using var sqlCommand = new SqlCommand(getMinionsNamesQuery, connection);
            using var reader = sqlCommand.ExecuteReader();
            List<string> minionNames = new List<string>();
            while (reader.Read())
            {
                minionNames.Add(reader["Name"].ToString());
            }

            string[] names = minionNames.ToArray();
            for (int i = 0; i < Math.Floor(names.Length / 2.0); i++)
            {
                Console.WriteLine(names[i]);
                Console.WriteLine(names[names.Length - i - 1]);
            }

            if (names.Length % 2 == 1)
            {
                Console.WriteLine(names[(int)Math.Ceiling(names.Length / 2.0)]);
            }
        }

        private static void RemoveVillain(SqlConnection connection)
        {
            int villainId = int.Parse(Console.ReadLine());
            var villainName = GetVillainName(connection, villainId);

            if (villainName == null)
            {
                Console.WriteLine("No such villain was found.");
                return;
            }

            int count = DeleteVillain(connection, villainId);
            Console.WriteLine($"{villainName} was deleted.");
            Console.WriteLine($"{count} minions were released.");
        }

        private static int DeleteVillain(SqlConnection connection, int villainId)
        {
            int count = 0;
            string queryDeleteVillain = "DELETE FROM MinionsVillains WHERE VillianId = @villainId";
            using (var sqlCommand = new SqlCommand(queryDeleteVillain, connection))
            {
                sqlCommand.Parameters.AddWithValue("@villainId", villainId);
                count = sqlCommand.ExecuteNonQuery();
            }

            queryDeleteVillain = "DELETE FROM Villains WHERE Id = @villainId";
            using (var sqlCommand = new SqlCommand(queryDeleteVillain, connection))
            {
                sqlCommand.Parameters.AddWithValue("@villainId", villainId);
                sqlCommand.ExecuteNonQuery();
            }

            return count;
        }

        private static object GetVillainName(SqlConnection connection, int villainId)
        {
            string queryVillainName = "SELECT Name FROM Villains WHERE Id = @villainId";
            using var sqlCommand = new SqlCommand(queryVillainName, connection);
            sqlCommand.Parameters.AddWithValue("@villainId", villainId);
            var villainName = sqlCommand.ExecuteScalar();
            return villainName;
        }

        private static void ChangeTownnamesCasing(SqlConnection connection)
        {
            string countryName = Console.ReadLine();
            int? countryId = GetCountryId(connection, countryName);

            if (countryId == null)
            {
                Console.WriteLine("No town names were affected.");
                return;
            }

            int towns = 0;
            Dictionary<string, string> townsNames = new Dictionary<string, string>();

            string queryGetTowns = "SELECT * FROM Towns WHERE CountryCode = @countryId";
            using (var sqlCommand = new SqlCommand(queryGetTowns, connection))
            {
                sqlCommand.Parameters.AddWithValue("@countryId", countryId);
                using (var reader = sqlCommand.ExecuteReader())
                {
                    var rows = reader.HasRows;
                    if (!rows)
                    {
                        Console.WriteLine("No town names were affected.");
                        return;
                    }

                    while (reader.Read())
                    {
                        towns++;
                        string id = reader["Id"].ToString();
                        string name = reader["Name"].ToString().ToUpper();

                        townsNames.Add(id, name);
                    }
                }
            }

            foreach (var townname in townsNames)
            {
                string updateTownNameQuery = "UPDATE Towns SET Name = @townName WHERE Id = @townId";
                using var sqlCommandUpdate = new SqlCommand(updateTownNameQuery, connection);
                sqlCommandUpdate.Parameters.AddWithValue("@townName", townname.Value);
                sqlCommandUpdate.Parameters.AddWithValue("@townId", townname.Key);
                sqlCommandUpdate.ExecuteNonQuery();
            }


            Console.WriteLine($"{towns} town names were affected.");
            Console.Write($"[");
            Console.Write(String.Join(", ", townsNames.Values));
            Console.Write($"]");
        }

        private static int? GetCountryId(SqlConnection connection, string countryName)
        {
            string queryGetCountryId = "SELECT Id FROM Countries WHERE Name = @countryName";
            using var sqlCommand = new SqlCommand(queryGetCountryId, connection);
            sqlCommand.Parameters.AddWithValue("@countryName", countryName);
            int? countryId = (int?)sqlCommand.ExecuteScalar();
            return countryId;
        }

        private static void AddMinion(SqlConnection connection)
        {
            string[] minionInfo = Console.ReadLine().Split(' ');
            string[] villainInfo = Console.ReadLine().Split(' ');

            string minionName = minionInfo[1];
            string minionAge = minionInfo[2];
            string minionTown = minionInfo[3];

            string villainName = villainInfo[1];

            int? townId = GetTownId(connection, minionTown);
            if (townId == null)
            {
                var insertTownQuery = "INSERT INTO Towns (Name) VALUES (@minionTown)";
                using var sqlCommand = new SqlCommand(insertTownQuery, connection);
                sqlCommand.Parameters.AddWithValue("@minionTown", minionTown);
                sqlCommand.ExecuteNonQuery();
                Console.WriteLine($"Town {minionTown} was added to the database.");
                townId = GetTownId(connection, minionTown);
            }

            int? villainId = GetVillainId(connection, villainName);
            if (villainId == null)
            {
                var insertVillainQuery = "INSERT INTO Villains (Name, EvilnessFactorId)  VALUES (@villainName, 4)";
                using var sqlCommand = new SqlCommand(insertVillainQuery, connection);
                sqlCommand.Parameters.AddWithValue("@villainName", villainName);
                sqlCommand.ExecuteNonQuery();
                Console.WriteLine($"Villain {villainName} was added to the database.");
                villainId = GetVillainId(connection, villainName);
            }

            CreateMinion(connection, minionName, minionAge, townId);

            int? minionId = GetMinionId(connection, minionName);

            InsertMinionVillain(connection, villainId, minionId);
            Console.WriteLine($"Successfully added {minionName} to be minion of {villainName}.");
        }

        private static void InsertMinionVillain(SqlConnection connection, int? villainId, int? minionId)
        {
            var insertIntoMinionVillainQuery = "INSERT INTO MinionsVillains VALUES (@minionId, @villainId)";
            var sqlCommand = new SqlCommand(insertIntoMinionVillainQuery, connection);
            sqlCommand.Parameters.AddWithValue("@villainId", villainId);
            sqlCommand.Parameters.AddWithValue("@minionId", minionId);
            sqlCommand.ExecuteNonQuery();
        }

        private static int? GetMinionId(SqlConnection connection, string minionName)
        {
            string queryMinionId = "SELECT Id FROM Minions WHERE Name = @Name";
            using var sqlCommand = new SqlCommand(queryMinionId, connection);
            sqlCommand.Parameters.AddWithValue("@Name", minionName);
            var minionId = sqlCommand.ExecuteScalar();
            return (int?)minionId;
        }

        private static void CreateMinion(SqlConnection connection, string minionName, string minionAge, int? townId)
        {
            string createMinion = "INSERT INTO Minions (Name, Age, TownId) VALUES (@name, @age, @townId)";
            using var sqlCommand = new SqlCommand(createMinion, connection);
            sqlCommand.Parameters.AddWithValue("@name", minionName);
            sqlCommand.Parameters.AddWithValue("@age", minionAge);
            sqlCommand.Parameters.AddWithValue("@townId", townId);

            sqlCommand.ExecuteNonQuery();
        }

        private static int? GetVillainId(SqlConnection connection, string villainName)
        {
            string queryVillainId = "SELECT Id FROM Villains WHERE Name = @villainName";
            using var sqlCommand = new SqlCommand(queryVillainId, connection);
            sqlCommand.Parameters.AddWithValue("@villainName", villainName);
            var villainId = sqlCommand.ExecuteScalar();
            return (int?)villainId;
        }

        private static int? GetTownId(SqlConnection connection, string minionTown)
        {
            string queryTownId = "SELECT Id FROM Towns WHERE Name = @minionTown";
            using var sqlCommand = new SqlCommand(queryTownId, connection);
            sqlCommand.Parameters.AddWithValue("@minionTown", minionTown);
            var townId = sqlCommand.ExecuteScalar();
            return (int?)townId;
        }

        private static void MinionNames(SqlConnection connection)
        {
            int villainId = int.Parse(Console.ReadLine());
            string villainNameQuery = "SELECT Name FROM Villains WHERE Id = @Id";
            var villainName = ExecuteScalar(connection, villainNameQuery, villainId);

            if (villainName == null)
            {
                Console.WriteLine($"No villain with ID {villainId} exists in the database.");
                return;
            }
            Console.WriteLine($"Villain: {villainName}");

            string minionsQuery = @"SELECT ROW_NUMBER() OVER (ORDER BY m.Name) as RowNum, m.Name, m.Age
                                        FROM MinionsVillains mv
                                        JOIN Minions m ON mv.MinionId = m.Id
                                        WHERE VillianId = @Id
                                        ORDER BY m.Name";

            using (SqlCommand command = new SqlCommand(minionsQuery, connection))
            {
                command.Parameters.AddWithValue("Id", villainId);
                using (var reader = command.ExecuteReader())
                {
                    var rows = reader.HasRows;
                    if (!rows)
                    {
                        Console.WriteLine("(no minions)");
                    }
                    while (reader.Read())
                    {
                        string rowNum = reader["RowNum"].ToString();
                        string minionName = reader["Name"].ToString();
                        string age = reader["Age"].ToString();

                        Console.WriteLine($"{rowNum}. {minionName} {age}");
                    }
                }
            }
        }

        private static object ExecuteScalar(SqlConnection connection, string query, int villainId)
        {
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", villainId);
                
                var result = command.ExecuteScalar();
                return result;
            }
        }

        private static void GetVillainNames(SqlConnection connection)
        {
            string query = @"SELECT v.Name, COUNT(mv.MinionId) AS MinionsNumber
                                 FROM Villains v
                                 JOIN MinionsVillains mv ON v.Id = mv.VillianId
                                 GROUP BY(v.Id), (v.Name)
                                 HAVING COUNT(mv.MinionId) > 3
                                 ORDER BY COUNT(mv.MinionId)";
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var name = reader[0];
                        var count = reader[1];
                        Console.WriteLine($"{name} - {count}");
                    }
                }
            }
        }

        private static void InitialSetup(SqlConnection connection)
        {
            //create database
            var createDatabase = "CREATE DATABASE MinionsDB";
            using (SqlCommand command = new SqlCommand(createDatabase, connection))
            {
                command.ExecuteNonQuery();
            }

            //create tables
            var createTablesStatements = GetCreateTableStatements();
            foreach (var query in createTablesStatements)
            {
                ExecuteNonQuery(connection, query);
            }

            //insert into tables

            var insertTablesStatements = GetInsertDataStatements();
            foreach (var query in insertTablesStatements)
            {
                ExecuteNonQuery(connection, query);
            }
        }

        private static string[] GetCreateTableStatements()
        {
            var result = new string[]
            {
                "CREATE TABLE Countries(Id INT PRIMARY KEY,Name nvarchar(50))",
                "CREATE TABLE Towns(Id INT PRIMARY KEY,Name nvarchar(50),CountryCode INT FOREIGN KEY REFERENCES Countries(Id))",
                "CREATE TABLE Minions(Id INT PRIMARY KEY,Name nvarchar(50),Age INT,TownId INT FOREIGN KEY REFERENCES Towns(Id))",
                "CREATE TABLE EvilnessFactors(Id INT PRIMARY KEY,Name nvarchar(50))",
                "CREATE TABLE Villains(Id INT PRIMARY KEY,Name nvarchar(50),EvilnessFactorId INT FOREIGN KEY REFERENCES EvilnessFactors(Id))",
                "CREATE TABLE MinionsVillains(MinionId INT FOREIGN KEY REFERENCES Minions(Id),VillianId INT FOREIGN KEY REFERENCES Villains(Id),CONSTRAINT PK_MinionsVillains PRIMARY KEY (MinionId, VillianId))"
            };

            return result;
        }

        private static void ExecuteNonQuery(SqlConnection sqlConnection, string query)
        {
            using SqlCommand command = new SqlCommand(query, sqlConnection);
            var result = command.ExecuteNonQuery();
        }

        private static string[] GetInsertDataStatements()
        {
            var result = new string[]
            {
                "INSERT INTO Countries (Id, Name) VALUES (1, 'Bulgaria'), (2, 'Norway'), (3, 'Cyprus'), (4, 'Greece'), (5, 'UK')",
                "INSERT INTO Towns(Id, Name, CountryCode) VALUES (1, 'Plovdiv', 1), (2, 'Oslo', 2), (3, 'Larnaca',3), (4, 'Athens', 4), (5, 'London', 5)",
                "INSERT INTO Minions VALUES (1, 'Kalina', 22, 2), (2, 'Kristian', 26, 2), (3, 'Pesho', 14, 1), (4, 'Miro', 19, 4), (5, 'Lucifer', 30, 3)",
                "INSERT INTO EvilnessFactors VALUES (1, 'super good'), (2, 'good'), (3, 'bad'), (4, 'evil'), (5, 'super evil')",
                "INSERT INTO Villains VALUES (1, 'Gru', 1), (2, 'Ivo', 2), (3, 'Teo', 3), (4, 'Sto', 4), (5, 'Pro', 5)",
                "INSERT INTO MinionsVillains VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5)"
            };

            return result;
        }
    }
}

--Problem 1. Find Names of All Employees by First Name
USE SoftUni
GO

SELECT FirstName, LastName
FROM Employees
WHERE FirstName LIKE 'SA%'

--Problem 2. Find Names of All employees by Last Name
SELECT FirstName, LastName
FROM Employees
WHERE LastName LIKE '%EI%'

--Problem 3. Find First Names of All Employees
SELECT FirstName
FROM Employees
WHERE YEAR(HireDate) >= 1995 and YEAR(HireDate) <= 2005 and DepartmentID in (3, 10)

--Problem 4. Find All Employees Except Engineers
SELECT FirstName, LastName
FROM Employees
WHERE JobTitle NOT LIKE '%engineer%'

--Problem 5. Find Towns with Name Length
SELECT Name
FROM Towns
WHERE LEN(Name) in (5, 6)
ORDER BY Name

--Problem 6. Find Towns Starting With
SELECT *
FROM Towns
WHERE SUBSTRING(Name, 1, 1) in ('M', 'K', 'B', 'E')
ORDER BY Name

--Problem 7. Find Towns Not Starting With
SELECT *
FROM Towns
WHERE SUBSTRING(Name, 1, 1) not in ('R', 'B', 'D')
ORDER BY Name

--Problem 8. Create View Employees Hired After 2000 Year
CREATE VIEW V_EmployeesHiredAfter2000 AS
SELECT FirstName, LastName
FROM Employees
WHERE YEAR(HireDate) > 2000

--Problem 9. Length of Last Name
SELECT FirstName, LastName
FROM Employees
WHERE LEN(LastName) = 5

--Problem 10. Rank Employees by Salary
SELECT EmployeeID, 
	   FirstName, 
	   LastName, 
	   Salary, 
	   DENSE_RANK () OVER (
	   PARTITION BY Salary ORDER BY EmployeeID
	   ) AS [Rank]
FROM Employees
WHERE (Salary BETWEEN 10000 AND 50000)
ORDER BY Salary DESC

--Problem 11. Find All Employees with Rank 2 *
SELECT *
FROM (
SELECT EmployeeID, 
	   FirstName, 
	   LastName, 
	   Salary, 
	   DENSE_RANK () OVER (
	   PARTITION BY Salary ORDER BY EmployeeID
	   ) AS [Rank]
FROM Employees
WHERE (Salary BETWEEN 10000 AND 50000)) s
WHERE [Rank] = 2
ORDER BY Salary DESC

--Problem 12. Countries Holding ‘A’ 3 or More Times
Use [Geography]
GO

SELECT CountryName as [Country Name], IsoCode AS [ISO Code]
FROM Countries
WHERE (LEN(CountryName) - LEN(REPLACE(UPPER(CountryName), 'A', '')) >= 3)
ORDER BY IsoCode

--Problem 13. Mix of Peak and River Names
SELECT PeakName, RiverName, LOWER(PeakName + SUBSTRING(RiverName, 2, LEN(RiverName) - 1)) AS Mix
FROM Peaks
JOIN Rivers ON SUBSTRING(PeakName, LEN(PeakName), 1) = SUBSTRING(RiverName, 1, 1)
ORDER BY Mix

--OR

SELECT PeakName, RiverName, CONCAT(LOWER(PeakName), '', SUBSTRING(LOWER(RiverName), 2, LEN(RiverName) - 1)) AS mix FROM peaks, rivers
WHERE RIGHT(PeakName, 1) = LEFT(RiverName, 1)
ORDER BY mix;

--Problem 14. Games From 2011 and 2012 Year
USE [Diablo]
GO

SELECT TOP 50 [Name], FORMAT([Start], 'yyyy-MM-dd') AS [Start]
FROM Games
WHERE YEAR([Start]) = 2011 Or YEAR([Start]) = 2012
ORDER BY [Start],
[Name]

--Problem 15. User Email Providers
SELECT Username, SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(Email) - CHARINDEX('@', Email)) AS [Email Provider]
FROM Users
ORDER BY [Email Provider], Username

--Problem 16. Get Users with IPAddress Like Pattern
SELECT Username, IpAddress
FROM Users
WHERE IpAddress LIKE '___.1%.%.___'
ORDER BY Username

--Problem 17. Show All Games with Duration
SELECT [Name], 
	CASE
		WHEN DATEPART(HOUR, [Start]) >= 0 and DATEPART(HOUR, [Start]) < 12 THEN 'Morning'
		WHEN DATEPART(HOUR, [Start]) >= 12 and DATEPART(HOUR, [Start]) < 18 THEN 'Afternoon'
		ELSE 'Evening'
	END AS [Part of the Day],
	CASE
		WHEN [Duration] <= 3 THEN 'Extra Short'
		WHEN [Duration] >= 4 and [Duration] <= 6 THEN 'Short'
		WHEN [Duration] > 6 THEN 'Long'
		ELSE 'Extra Long'
	END AS [Duration]
FROM Games
ORDER BY [Name], [Duration], [Part of the Day]

---Problem 18. Orders Table
USE [Orders]
GO

SELECT [ProductName], [OrderDate], DATEADD(DAY, 3, [OrderDate]) AS [Pay Due], DATEADD(Month, 1, [OrderDate]) AS [Deliver Due]
FROM Orders

--Problem 19. People Table
CREATE TABLE [People] (
	Id INT NOT NULL PRIMARY KEY,
	[Name] varchar(50) NOT NULL,
	[Birthdate] datetime
)


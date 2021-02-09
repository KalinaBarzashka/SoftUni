USE SoftUni
GO

--2. Find All Information About Departments
Select *
FROM Departments

--3. Find all Department Names
Select Name
FROM Departments

--4. Find Salary of Each Employee
Select FirstName, LastName, Salary
FROM Employees

--5. Find Full Name of Each Employee
Select FirstName, MiddleName, LastName
FROM Employees

--6. Find Email Address of Each Employee
Select FirstName + '.' + LastName + '@softuni.bg' as 'Full Email Address'
FROM Employees

SELECT CONCAT(FirstName, '.', LastName, '@softuni.bg') AS 'Full Email Address'
FROM Employees

--7. Find All Different Employee’s Salaries
Select Distinct Salary
FROM Employees

--8. Find all Information About Employees
Select *
FROM Employees
WHERE JobTitle = 'Sales Representative'

--9. Find Names of All Employees by Salary in Range
Select FirstName, LastName, JobTitle
FROM Employees
WHERE Salary BETWEEN 20000 AND 30000

--10. Find Names of All Employees
SELECT FirstName + ' ' + MiddleName + ' ' + LastName as 'Full Name'
FROM Employees
WHERE Salary = 25000 OR Salary = 14000 OR Salary = 12500 OR Salary = 23600

--11. Find All Employees Without Manager
SELECT FirstName, LastName
FROM Employees
WHERE ManagerID is NULL

--12. Find All Employees with Salary More Than 50000
SELECT FirstName, LastName, Salary
FROM Employees
WHERE Salary > 50000
ORDER BY Salary DESC

--13. Find 5 Best Paid Employees
SELECT TOP 5 FirstName, LastName
FROM Employees
ORDER BY Salary DESC

--14. Find All Employees Except Marketing
SELECT FirstName, LastName
FROM Employees
WHERE DepartmentID != 4

--15. Sort Employees Table
SELECT *
FROM Employees
ORDER BY Salary DESC,
FirstName ASC,
LastName DESC,
MiddleName ASC

--16. Create View Employees with Salaries
CREATE VIEW V_EmployeesSalaries AS
SELECT FirstName, LastName, Salary
FROM Employees

--17. Create View Employees with Job Titles
CREATE VIEW V_EmployeeNameJobTitle AS
SELECT FirstName + ' ' + ISNULL(MiddleName, '') + ' ' + LastName AS 'Full Name', JobTitle
FROM Employees

--18. Distinct Job Titles
SELECT DISTINCT JobTitle
FROM Employees

--19. Find First 10 Started Projects
SELECT TOP(10) *
FROM Projects
ORDER BY StartDate, [Name]

--20. Last 7 Hired Employees
SELECT TOP(7) FirstName, LastName, HireDate
FROM Employees
ORDER BY HireDate DESC

--21. Increase Salaries
UPDATE Employees
SET Salary = Salary + Salary * 0.12
WHERE DepartmentID IN (1,2,4,11)

--or

UPDATE Employees
SET Salary = Salary + Salary * 0.12
WHERE DepartmentID IN (SELECT DepartmentID FROM Departments
					   WHERE [Name] IN ('Engineering', 'Tool Design', 'Marketing', 'Information Services'))
--SELECT `department_id` FROM `departments`
	--WHERE `name` IN ('Engineering', 'Tool Design', 'Marketing', 'Information Services')

SELECT Salary
FROM Employees

--22. All Mountain Peaks
SELECT PeakName
FROM Peaks
ORDER BY PeakName

--23. Biggest Countries by Population
SELECT TOP(30) CountryName, [Population]
FROM Countries
WHERE ContinentCode = (
						SELECT ContinentCode
						FROM Continents
						WHERE ContinentName = 'Europe')
ORDER BY [Population] DESC,
		 [CountryName]

--24. Countries and Currency (Euro / Not Euro)
SELECT CountryName, CountryCode,
CASE
	WHEN CurrencyCode = 'EUR' THEN 'Euro'
	ELSE 'Not Euro'
END AS CurrencyCode
FROM Countries
ORDER BY CountryName

--25. All Diablo Characters
SELECT [Name]
FROM Characters
ORDER BY [Name]
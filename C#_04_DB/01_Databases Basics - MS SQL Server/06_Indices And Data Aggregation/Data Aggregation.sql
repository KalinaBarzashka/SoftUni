USE [Gringotts]
GO
--Problem 01. Records’ Count
SELECT Count(*)
FROM WizzardDeposits

--Problem 02. Longest Magic Wand
SELECT MAX(MagicWandSize) AS LongestMagicWand
FROM WizzardDeposits

--Problem 03. Longest Magic Wand per Deposit Groups
SELECT DepositGroup, MAX(MagicWandSize) AS LongestMagicWand
FROM WizzardDeposits
GROUP BY DepositGroup

--Problem 04. Smallest Deposit Group per Magic Wand Size
SELECT TOP(2) DepositGroup
FROM WizzardDeposits
GROUP BY DepositGroup
ORDER BY AVG(MagicWandSize)

--Problem 05. Deposits Sum
SELECT DepositGroup, SUM(DepositAmount) AS TotalSum
FROM WizzardDeposits
GROUP BY DepositGroup

--Problem 06. Deposits Sum for Ollivander Family
SELECT DepositGroup, SUM(DepositAmount) AS TotalSum
FROM WizzardDeposits
WHERE MagicWandCreator = 'Ollivander family'
GROUP BY DepositGroup

--Problem 07. Deposits Filter
SELECT DepositGroup, SUM(DepositAmount) AS TotalSum
FROM WizzardDeposits
WHERE MagicWandCreator = 'Ollivander family'
GROUP BY DepositGroup
HAVING SUM(DepositAmount) < 150000
ORDER BY TotalSum DESC

--Problem 08. Deposit Charge
SELECT DepositGroup, MagicWandCreator, MIN(DepositCharge)
FROM WizzardDeposits
GROUP BY DepositGroup, MagicWandCreator
ORDER BY MagicWandCreator ASC, DepositGroup ASC

--Problem 09. Age Groups
SELECT 
	CASE
		WHEN Age >= 0 AND Age < 11 THEN '[0-10]'
		WHEN Age >= 11 AND Age < 21 THEN '[11-20]'
		WHEN Age >= 21 AND Age < 31 THEN '[21-30]'
		WHEN Age >= 31 AND Age < 41 THEN '[31-40]'
		WHEN Age >= 41 AND Age < 51 THEN '[41-50]'
		WHEN Age >= 51 AND Age < 61 THEN '[51-60]'
		WHEN Age >= 61 THEN '[61+]'
	END AS [AgeGroup],
	COUNT(Age) AS WizardCount
FROM WizzardDeposits
GROUP BY CASE
		WHEN Age >= 0 AND Age < 11 THEN '[0-10]'
		WHEN Age >= 11 AND Age < 21 THEN '[11-20]'
		WHEN Age >= 21 AND Age < 31 THEN '[21-30]'
		WHEN Age >= 31 AND Age < 41 THEN '[31-40]'
		WHEN Age >= 41 AND Age < 51 THEN '[41-50]'
		WHEN Age >= 51 AND Age < 61 THEN '[51-60]'
		WHEN Age >= 61 THEN '[61+]'
	END

--OR
SELECT ageGroups.AgeGroup, COUNT(*) FROM
(
SELECT 
CASE
WHEN Age BETWEEN 0 AND 10 THEN '[0-10]'
WHEN Age BETWEEN 11 AND 20 THEN '[11-20]'
WHEN Age BETWEEN 21 AND 30 THEN '[21-30]'
WHEN Age BETWEEN 31 AND 40 THEN '[31-40]'
WHEN Age BETWEEN 41 AND 50 THEN '[41-50]'
WHEN Age BETWEEN 51 AND 60 THEN '[51-60]'
WHEN Age >= 61 THEN '[61+]'
END AS AgeGroup
FROM WizzardDeposits
) AS ageGroups
GROUP BY ageGroups.AgeGroup

--Problem 10. First Letter
SELECT SUBSTRING(FirstName, 1, 1) AS FirstLetter
FROM WizzardDeposits
WHERE DepositGroup = 'Troll Chest'
GROUP BY SUBSTRING(FirstName, 1, 1)
ORDER BY FirstLetter

--Problem 11. Average Interest
SELECT DepositGroup, IsDepositExpired, AVG(DepositInterest) AS AverageInterest
FROM WizzardDeposits
WHERE DepositStartDate > '1985-01-01'
GROUP BY DepositGroup, IsDepositExpired
ORDER BY DepositGroup DESC, IsDepositExpired ASC

--Problem 12
SELECT SUM(XX.DIFF) AS SumDifference
FROM (SELECT DepositAmount - (SELECT DepositAmount FROM WizzardDeposits WHERE Id = g.Id + 1)
AS DIFF FROM WizzardDeposits g) AS XX

--Problem 13. Departments Total Salaries
USE [SoftUni]
GO

SELECT DepartmentID, SUM(Salary) AS TotalSalary
FROM Employees
GROUP BY DepartmentID
ORDER BY DepartmentID

--Problem 14. Employees Minimum Salaries
SELECT DepartmentID, MIN(Salary) AS MinimumSalary
FROM Employees
WHERE DepartmentID in (2, 5, 7) and HireDate > '2000-01-01'
GROUP BY DepartmentID

--Problem 15. Employees Average Salaries
SELECT * INTO EmployeesAS
FROM Employees
WHERE Salary > 30000

DELETE FROM EmployeesAS
WHERE ManagerID = 42

UPDATE EmployeesAS
SET Salary += 5000
WHERE DepartmentID = 1

SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM EmployeesAS
GROUP BY DepartmentID

--Problem 16. Employees Maximum Salaries
SELECT DepartmentID, MAX(Salary) AS MaxSalary
FROM Employees
GROUP BY DepartmentID
HAVING MAX(Salary) NOT BETWEEN 30000 AND 70000

--Problem 17. Employees Count Salaries
SELECT COUNT(*)
FROM Employees
WHERE ManagerID is NULL

--Problem 18. 3rd Highest Salary
SELECT DepartmentID, 
	(SELECT DISTINCT Salary FROM Employees WHERE DepartmentID = e.DepartmentID ORDER BY Salary DESC OFFSET 2 ROWS FETCH NEXT 1 ROWS ONLY) AS ThirdHighestSalary
FROM Employees e
WHERE (SELECT DISTINCT Salary FROM Employees WHERE DepartmentID = e.DepartmentID ORDER BY Salary DESC OFFSET 2 ROWS FETCH NEXT 1 ROWS ONLY) IS NOT NULL
GROUP BY DepartmentID

SELECT e.DepartmentID,Salary, DENSE_RANK() OVER   
    (PARTITION BY e.DepartmentId ORDER BY e.Salary DESC) AS [Rank]  --PARTITION BY e.Salary 
FROM Employees e
GROUP BY e.DepartmentID, e.Salary
HAVING DENSE_RANK() OVER   
    (PARTITION BY e.DepartmentId ORDER BY e.Salary DESC) = 3

--Problem 19. Salary Challenge
SELECT TOP(10) e.FirstName, e.LastName, e.DepartmentID
FROM Employees e
WHERE e.Salary > (SELECT AVG(Salary)
				FROM Employees s
				GROUP BY DepartmentID
				HAVING e.DepartmentID = s.DepartmentID)
ORDER BY DepartmentID
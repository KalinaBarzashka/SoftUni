-- Problem 1. Create DataBase
use [master]
GO

CREATE DATABASE Minions
GO

-- Problem 2. Create Tables
use [Minions]
GO

CREATE TABLE Minions
(
	Id INT NOT NULL Primary Key,
	Name VARCHAR(50),
	Age INT
)

CREATE TABLE Towns
(
	Id INT NOT NULL Primary Key,
	Name VARCHAR(50)
)

-- Problem 3. Alter Minions Table
ALTER TABLE Minions
ADD TownId INT Foreign Key REFERENCES Towns(Id)

--Problem 4. Insert Records in Both Tables
INSERT INTO Towns
VALUES
(1, 'Sofia'),
(2, 'Plovdiv'),
(3, 'Varna')

INSERT INTO Minions 
VALUES 
(1, 'Kevin', 22, 1),
(2, 'Bob', 15, 3),
(3, 'Steward', NULL, 2)

--Problem 5. Truncate Table Minions
TRUNCATE TABLE Minions

--Problem 6. Drop All Tables
DROP TABLE Minions
DROP TABLE Towns

--Problem 7. Create Table People
USE Minions
GO

CREATE TABLE People
(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Name NVARCHAR(200) NOT NULL,
	Picture VARBINARY(MAX),
	Height DECIMAL(5, 2),
	Weight DECIMAL(5, 2),
	Gender CHAR(1) NOT NULL CHECK (Gender IN ('m', 'f')),
	Birthdate DATE NOT NULL,
	Biography NVARCHAR(MAX)
)

INSERT INTO People
VALUES
('Kalina', NULL, 1.73, 58.00, 'f', '1999-02-22', 'Very kind person. Study in UNSS and SoftUni. Work in DSK Bank.'),
('Kris', NULL, 1.85, 64.00, 'm', '1996-03-23', 'Very kind person. Study in SoftUni. Work in HP.'),
('Dris', NULL, 1.86, 80.00, 'm', '1999-02-22', 'Train hard.'),
('Kapina', NULL, 1.60, 51.00, 'f', '1981-05-28', 'Very kind person.'),
('Malina', NULL, 1.64, 54.00, 'f', '1990-10-11', 'Some data as biography.')

--Problem 8. Create Table Users
CREATE TABLE Users
(
	Id INT NOT NULL IDENTITY(1,1),
	Username VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(26) NOT NULL,
	ProfilePicture VARBINARY(MAX),
	LastLoginTime DATETIME2,
	IsDeleted BIT NOT NULL DEFAULT(0),
)

ALTER TABLE USERS
ADD CONSTRAINT PK_Users PRIMARY KEY(Id)

INSERT INTO Users(Username, Password) VALUES
('Kalina', '123'),
('Kris', '456'),
('Dris', '789'),
('Kapina', '1011'),
('Malina', '1213')

--Problem 9. Change Primary Key
ALTER TABLE USERS
DROP CONSTRAINT PK_Users
GO
ALTER TABLE USERS
ADD CONSTRAINT PK_Users PRIMARY KEY (Id, Username)

--Problem 10. Add Check Constraint
ALTER TABLE USERS
ADD CONSTRAINT CHK_Users_Password 
CHECK (LEN([Password]) >= 5)

INSERT INTO Users(Username, Password) VALUES
('KalHNJinaDSA', '1231111111')

--Problem 11. Set Default Value of a Field
ALTER TABLE Users
ADD CONSTRAINT DFV_LastLonginTime
DEFAULT GETDATE() FOR LastLoginTime

--Problem 12. Set Unique Field
ALTER TABLE Users
DROP CONSTRAINT PK_Users
GO

ALTER TABLE Users
ADD CONSTRAINT PK_Users PRIMARY KEY (Id)
GO

ALTER TABLE Users
ADD CONSTRAINT Unique_Username
CHECK (LEN(Username) >= 3)

--Problem 13. Movies Database
use [master]
GO

CREATE DATABASE Movies
GO

CREATE TABLE Directors
(
	Id INT NOT NULL IDENTITY(1,1),
	DirectorName NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

CREATE TABLE Genres
(
	Id INT NOT NULL IDENTITY(1,1),
	GenreName NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

CREATE TABLE Categories
(
	Id INT NOT NULL IDENTITY(1,1),
	CategoryName NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

CREATE TABLE Movies
(
	Id INT NOT NULL IDENTITY(1,1),
	Title NVARCHAR(50),
	DirectorId INT NOT NULL, --FOREIGN KEY REFERENCES Directors(Id)
	CopyrightYear INT NOT NULL, --DATETIME2
	[Length] INT,
	GenreId INT NOT NULL, --FOREIGN KEY REFERENCES Genres(Id)
	CatgoryId INT NOT NULL, --FOREIGN KEY REFERENCES Categories(Id)
	Rating INT,
	Notes NVARCHAR(MAX)
)

ALTER TABLE Directors
ADD CONSTRAINT PK_Directors
PRIMARY KEY (Id)

ALTER TABLE Genres
ADD CONSTRAINT PK_Genres
PRIMARY KEY (Id)

ALTER TABLE Categories
ADD CONSTRAINT PK_Categories
PRIMARY KEY (Id)

ALTER TABLE Movies
ADD CONSTRAINT PK_Movies
PRIMARY KEY (Id)

INSERT INTO Directors
VALUES ('Kalina', 'Some notes left here from the director with name Kalina.'),
('Kristian', 'Some notes left here from the director with name Kristian.'),
('Пешо', 'Some notes left here from the director with name Пешо.'),
('Гошо', 'Some notes left here from the director with name Гошо.'),
('Elena', 'Some notes left here from the director with name Elena.')

INSERT INTO Genres
VALUES ('Иван', 'Отличникът'),
('Ивелина', 'Кифлата'),
('Бай Симеон', 'Ремонтира всичко'),
('Anelia', 'Some notes left here from Anelia.'),
('Simona', 'Writer')

INSERT INTO Categories
VALUES ('HISTORY', 'Отличен филм'),
('Action', 'Oscar'),
('History','other history films'),
('drama', 'hmm dramaa' ),
('Triller', 'killers')

INSERT INTO Movies
VALUES(' King' ,5,1999,78,1,5,10,'otlichen'),
('RRIRIR',4,2000,90,2,4,9,'otlichen'),
('plpppo',3,1980,100,3,3,5,'otlichen'),
('kkiklo',2,1890,20,4,2,10,'iopkll'),
('ukukkk',1,1990,120,5,1,10,'plpppp')

--Problem 14. Car Rental Database
use [master]
Go

CREATE DATABASE CarRental
GO

USE [CarRental]
GO

CREATE TABLE Categories
(	Id INT NOT NULL IDENTITY(1,1),
	CategoryName NVARCHAR(50) NOT NULL,
	DailyRate DECIMAL(10,2), --DOUBLE?
	WeeklyRate DECIMAL(10,2),
	MonthlyRate DECIMAL(10,2),
	WeekendRate DECIMAL(10,2)
)


ALTER TABLE Categories ADD 
CONSTRAINT CHK_AtLeastOneRate
	CHECK ((DailyRate IS NOT NULL)
			OR (WeeklyRate IS NOT NULL)
			OR (MonthlyRate IS NOT NULL)
			OR (WeekendRate IS NOT NULL)),
CONSTRAINT PK_Categories PRIMARY KEY(Id)

CREATE TABLE Cars
(
	Id INT NOT NULL IDENTITY(1,1), 
	PlateNumber VARCHAR(50) NOT NULL, 
	Manufacturer VARCHAR(50) NOT NULL, 
	Model VARCHAR(50) NOT NULL, 
	CarYear INT NOT NULL, --DATETIME2?
	CategoryId INT NOT NULL, 
	Doors TINYINT NOT NULL, 
	Picture VARBINARY(MAX), 
	Condition NVARCHAR(50), 
	Available BIT DEFAULT 1,
)

ALTER TABLE Cars ADD
CONSTRAINT PK_Cars PRIMARY KEY (Id),
CONSTRAINT FK_CarCategory FOREIGN KEY (Id) REFERENCES Categories(Id)


CREATE TABLE Employees 
(
	Id INT NOT NULL IDENTITY(1,1),
	FirstName NVARCHAR(50) NOT NULL, 
	LastName NVARCHAR(50) NOT NULL, 
	Title NVARCHAR(50) NOT NULL, 
	Notes NVARCHAR(MAX)
)

ALTER TABLE Employees
ADD CONSTRAINT PK_Employees PRIMARY KEY (Id)

CREATE TABLE Customers 
(
	Id INT NOT NULL IDENTITY(1,1),
	DriverLicenceNumber VARCHAR(50) UNIQUE NOT NULL,
	FullName NVARCHAR(50) NOT NULL,
	Address NVARCHAR(50),
	City NVARCHAR(50),
	ZIPCode NVARCHAR(50),
	Notes NVARCHAR(MAX)
)

ALTER TABLE Customers
ADD CONSTRAINT PK_Customers PRIMARY KEY (Id)

CREATE TABLE RentalOrders
(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	EmployeeId INT NOT NULL,
	CustomerId INT NOT NULL,
	CarId INT NOT NULL,
	TankLevel NUMERIC(5, 2), --CHECK NUMERIC TYPE
	KilometrageStart INT,
	KilometrageEnd INT,
	TotalKilometrage INT,
	StartDate DATETIME2 NOT NULL,
	EndDate DATETIME2 NOT NULL,
	TotalDays INT NOT NULL,
	RateApplied DECIMAL(10, 2),
	TaxRate DECIMAL(10, 2),
	OrderStatus NVARCHAR(50),
	Notes NVARCHAR(MAX)
)

ALTER TABLE RentalOrders
ADD 
CONSTRAINT FK_OrederEmployeeId FOREIGN KEY (EmployeeId) REFERENCES Employees(Id),
CONSTRAINT FK_OrederCustomerId FOREIGN KEY (CustomerId) REFERENCES Customers(Id),
CONSTRAINT FK_OrederCarId FOREIGN KEY (CarId) REFERENCES Cars(Id),
CONSTRAINT CHK_TotalDays CHECK(DATEDIFF(DAY, StartDate, EndDate) = TotalDays)

INSERT INTO Categories
VALUES('First Category', 10, 50, 200, 50),
('Second Category', 20, 90, 330, 100),
('Third Category', 30, 130, 2700, 155)

INSERT INTO Cars (PlateNumber, Manufacturer, Model, CarYear, CategoryId, Doors, Available)
VALUES('CT7777CB', 'BMW', '320', '2002', 3, 4, 1),
('CT7557CB', 'BMW', '535', '2009', 3, 4, 1),
('CT7373CB', 'BMW', '320', '1989', 1, 2, 1)

INSERT INTO Employees (FirstName, LastName, Title)
VALUES('First', 'One', 'Mechanic'),
('Second', 'Two', 'Team Leader'),
('Third', 'Three', 'Boss')

INSERT INTO Customers (DriverLicenceNumber, FullName)
VALUES('123', 'First Name'),
('234', 'Second Name'),
('345', 'Third Name')

INSERT INTO RentalOrders(EmployeeId, CustomerId, CarId, StartDate, EndDate, TotalDays)
VALUES
(3, 3, 3, '01-01-2010', '01-02-2010', 1),
(1, 1, 1, '01-01-2010', '01-03-2010', 2),
(2, 2, 2, '01-01-2010', '01-04-2010', 3)

--Problem 15. Hotel Database
USE [master]
GO

CREATE DATABASE Hotel
GO

USE [Hotel]
GO

CREATE TABLE Employees
(
	Id INT NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	Title NVARCHAR(255) NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE Employees
ADD CONSTRAINT PK_EmployeeId PRIMARY KEY (Id)

INSERT INTO Employees (Id, FirstName, LastName, Title)
VALUES (1, 'Kalina', 'Barzashka', 'Expert'),
(2, 'Kristian', 'Krasimirov', 'Dev'),
(3, 'Gosho', 'Georgiev', 'Manager')

CREATE TABLE Customers
(
	AccountNumber INT NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
	PhoneNumber VARCHAR(20),
	EmergencyName NVARCHAR(50) NOT NULL,
	EmergencyNumber INT NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE Customers
ADD CONSTRAINT PK_CustomerId PRIMARY KEY (AccountNumber)

INSERT INTO Customers (AccountNumber, FirstName, LastName, EmergencyName, EmergencyNumber)
VALUES (1, 'Kril', 'Kirilov', 'Kiro', 111111),
(2, 'Pesho', 'Petkov', 'PP', 222222),
(3, 'Georgi', 'Simeonov', 'Gogi', 333333)

CREATE TABLE RoomStatus
(
	RoomStatus NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE RoomStatus
ADD CONSTRAINT PK_RoomStatus PRIMARY KEY (RoomStatus)

INSERT INTO RoomStatus (RoomStatus, Notes)
VALUES ('Free', 'This room is free for use and can be reserved.'),
('In use', 'This room is currently in use.'),
('Reserved', 'Waiting for the rooms guests.')

CREATE TABLE RoomTypes
(
	RoomType NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE RoomTypes
ADD CONSTRAINT PK_RoomTypes PRIMARY KEY (RoomType)

INSERT INTO RoomTypes (RoomType, Notes)
VALUES ('Luxory', 'cool room.'),
('Casual', 'For normal people'),
('Misery', 'This one is cheep.')

CREATE TABLE BedTypes
(
	BedType NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE BedTypes
ADD CONSTRAINT PK_BedTypes PRIMARY KEY (BedType)

INSERT INTO BedTypes (BedType)
VALUES ('Single'),
('Double'),
('King')

CREATE TABLE Rooms
(
	RoomNumber INT NOT NULL,
	RoomType NVARCHAR(50) NOT NULL,
	BedType NVARCHAR(50) NOT NULL,
	Rate DECIMAL(10, 2) NOT NULL,
	RoomStatus NVARCHAR(50) NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE Rooms ADD
CONSTRAINT PK_RoomNumber PRIMARY KEY(RoomNumber),
CONSTRAINT FK_RoomType FOREIGN KEY (RoomType) REFERENCES RoomTypes(RoomType),
CONSTRAINT FK_BedType FOREIGN KEY (BedType) REFERENCES BedTypes(BedType),
CONSTRAINT FK_RoomStatus FOREIGN KEY (RoomStatus) REFERENCES RoomStatus(RoomStatus)

INSERT INTO Rooms
VALUES (1, 'Luxory', 'King', 100, 'Reserved', 'Some notes'),
(2, 'Casual', 'Double', 50, 'In use', 'some notes for casual rooms'),
(3, 'Misery', 'Single', 19, 'Free', 'Other notes')

CREATE TABLE Payments 
(
	Id INT NOT NULL,
	EmployeeId INT NOT NULL,
	PaymentDate DATETIME2 NOT NULL,
	AccountNumber INT NOT NULL,
	FirstDateOccupied DATE NOT NULL,
	LastDateOccupied DATE NOT NULL,
	TotalDays INT NOT NULL,
	AmountCharged DECIMAL(10, 2) NOT NULL,
	TaxRate DECIMAL(10, 2) NOT NULL,
	TaxAmount DECIMAL(10, 2) NOT NULL,
	PaymentTotal DECIMAL(10, 2) NOT NULL,
	Notes NVARCHAR(MAX)
)

ALTER TABLE Payments
ADD CONSTRAINT PK_PaymentsId PRIMARY KEY (Id),
CONSTRAINT FK_EmployeeId FOREIGN KEY (EmployeeId) REFERENCES Employees(Id),
CONSTRAINT FK_AccountNumber FOREIGN KEY (AccountNumber) REFERENCES Customers(AccountNumber),
CONSTRAINT CHK_TotalDays CHECK(DATEDIFF(DAY, FirstDateOccupied, LastDateOccupied) = TotalDays),
CONSTRAINT CHK_TaxAmount CHECK(TaxAmount = TotalDays * TaxRate)

INSERT INTO Payments (Id, EmployeeId, PaymentDate, AccountNumber, FirstDateOccupied, LastDateOccupied, TotalDays, AmountCharged, TaxRate, TaxAmount, PaymentTotal)
VALUES (1, 1, '10-05-2015', 1, '10-05-2015', '10-10-2015', 5, 75, 50, 250, 75),
(2, 3, '10-11-2015', 1, '12-15-2015', '12-25-2015', 10, 100, 50, 500, 100),
(3, 2, '12-23-2015', 1, '12-23-2015', '12-24-2015', 1, 75, 75, 75, 75)

CREATE TABLE Occupancies 
(
	Id INT NOT NULL,
	EmployeeId INT NOT NULL,
	DateOccupied DATE NOT NULL,
	AccountNumber INT NOT NULL,
	RoomNumber INT NOT NULL,
	RateApplied DECIMAL(10, 2),
	PhoneCharge VARCHAR(50),
	Notes NVARCHAR(MAX)
)

ALTER TABLE Occupancies
ADD CONSTRAINT PK_OccupanciesId PRIMARY KEY (Id),
CONSTRAINT FK_EmployeeIdOcc FOREIGN KEY (EmployeeId) REFERENCES Employees(Id),
CONSTRAINT FK_AccountNumberOcc FOREIGN KEY (AccountNumber) REFERENCES Customers(AccountNumber),
CONSTRAINT FK_RoomNumberOcc FOREIGN KEY (RoomNumber) REFERENCES Rooms(RoomNumber)

INSERT INTO Occupancies(Id, EmployeeId, DateOccupied, AccountNumber, RoomNumber, PhoneCharge)
VALUES
(1, 2, '08-24-2012', 3, 1, '088 88 888 888'),
(2, 3, '06-15-2015', 2, 3, '088 88 555 555'),
(3, 1, '05-12-1016', 1, 2, '088 88 555 333')

--Problem 16. Create SoftUni Database
USE [master]
GO

CREATE DATABASE SoftUni
GO

USE SoftUni
GO

CREATE TABLE Towns
(
	Id INT NOT NULL IDENTITY(1,1),
	Name NVARCHAR(50)
)

ALTER TABLE Towns
ADD CONSTRAINT PK_TownId PRIMARY KEY (Id)

CREATE TABLE Addresses
(
	Id INT NOT NULL IDENTITY(1,1),
	AddressText VARCHAR(50),
	TownId INT NOT NULL
)

ALTER TABLE Addresses
ADD CONSTRAINT PK_AddressId PRIMARY KEY (Id),
CONSTRAINT FK_TownId FOREIGN KEY (TownId) REFERENCES Towns(Id)

CREATE TABLE Departments
(
	Id INT NOT NULL IDENTITY(1,1), 
	Name VARCHAR(50) NOT NULL
)

ALTER TABLE Departments
ADD CONSTRAINT PK_DepartmentId PRIMARY KEY (Id)

CREATE TABLE Employees
(
	Id INT NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	MiddleName VARCHAR(50),
	LastName VARCHAR(50),
	JobTitle VARCHAR(50) NOT NULL,
	DepartmentId INT NOT NULL,
	HireDate DATE,
	Salary DECIMAL(9,2),
	AddressId INT NOT NULL
)

ALTER TABLE Employees
ADD CONSTRAINT PK_EmployeeId PRIMARY KEY (Id),
CONSTRAINT FK_DepartmentId FOREIGN KEY (DepartmentId) REFERENCES Departments(Id),
CONSTRAINT FK_AddressId FOREIGN KEY (AddressId) REFERENCES Addresses(Id)

--Problem 17. Backup Database
--OK

--Problem 18. Basic Insert
INSERT INTO Towns(Name) VALUES
('Sofia'), 
('Plovdiv'), 
('Varna'), 
('Burgas')

INSERT INTO Departments(Name) VALUES
('Engineering'), 
('Sales'), 
('Marketing'), 
('Software Development'),
('Quality Assurance')

INSERT INTO Addresses(TownId) VALUES
(1), 
(2), 
(3), 
(4)

INSERT INTO Employees(Id, FirstName, MiddleName, LastName, JobTitle, DepartmentId, HireDate, Salary, AddressId) VALUES
(1, 'Ivan', 'Ivanov', 'Ivanov', '.NET Developer', 4, '2013-02-01', 3500.00, 1),
(2, 'Petar', 'Petrov', 'Petrov', 'Senior Engineer', 1, '2004-03-02', 4000.00, 2),
(3, 'Maria', 'Petrova', 'Ivanova', 'Intern', 5, '2016-08-28', 525.25, 3),
(4, 'Georgi', 'Teziev', 'Ivanov', 'CEO', 2, '2007-12-09', 3000.00, 4),
(5, 'Peter', 'Pan', 'Pan', 'Intern', 3, '2016-08-28', 599.88, 3)

--Problem 19. Basic Select All Fields
Select *
From Towns

Select *
From Departments

Select *
From Employees

--Problem 20. Basic Select All Fields and Order Them
Select *
From Towns
ORDER BY [Name] ASC

Select *
From Departments
ORDER BY [Name] ASC

Select *
From Employees
ORDER BY [Salary] DESC

--Problem 21. Basic Select Some Fields
Select [Name]
From Towns
ORDER BY [Name] ASC

Select [Name]
From Departments
ORDER BY [Name] ASC

Select FirstName, LastName, JobTitle, Salary
From Employees
ORDER BY [Salary] DESC

--Problem 22. Increase Employees Salary
UPDATE Employees
SET Salary = Salary + Salary * 0.10
 
Select Salary
From Employees

--Problem 23. Decrease Tax Rate
USE Hotel
GO

UPDATE Payments
SET TaxRate = TaxRate - TaxRate * 0.03
 
Select TaxRate
From Payments

--Problem 24. Delete All Records
USE Hotel
GO

TRUNCATE TABLE Occupancies

-- DROP EVERYTHING FROM EXERCISE
USE [master]
DROP DATABASE Minions
DROP DATABASE Movies
DROP DATABASE CarRental
DROP DATABASE Hotel
DROP DATABASE SoftUni
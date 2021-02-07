USE [master]
GO

CREATE DATABASE TableRelations
GO

USE TableRelations
GO

--Problem 1. One-To-One Relationship
CREATE TABLE Persons
(
	PersonID INT NOT NULL,
	FirstName NVARCHAR(50) NOT NULL,
	Salary DECIMAL(10,2) NOT NULL,
	PassportID INT NOT NULL
)

CREATE TABLE Passports
(
	PassportID INT NOT NULL,
	PassportNumber NVARCHAR(50) NOT NULL
)

INSERT INTO Persons
VALUES (1, 'Roberto', 43300.00, 102),
(2, 'Tom', 56100.00, 103),
(3, 'Yana', 60200.00, 101)

INSERT INTO Passports
VALUES (101, 'N34FG21B'),
(102, 'K65LO4R7'),
(103, 'ZE657QP2')

ALTER TABLE Persons
ADD CONSTRAINT PK_PersonID Primary Key(PersonID)

ALTER TABLE Passports
ADD CONSTRAINT PK_PassportID Primary Key (PassportID)

ALTER TABLE Persons
ADD CONSTRAINT FK_PersonToPassportID Foreign Key (PassportID) REFERENCES Passports(PassportID)

--Problem 2. One-To-Many Relationship
CREATE TABLE Models
(
	ModelID INT NOT NULL,
	Name NVARCHAR(50) NOT NULL,
	ManufacturerID INT NOT NULL
)

CREATE TABLE Manufacturers
(
	ManufacturerID INT NOT NULL,
	Name NVARCHAR(50) NOT NULL,
	EstablishedOn DATE
)

INSERT INTO Models
VALUES (101, 'X1', 1),
(102, 'i6', 1),
(103, 'Model S', 2),
(104, 'Model X', 2),
(105, 'Model 3', 2),
(106, 'Nova', 3)

INSERT INTO Manufacturers
VALUES (1, 'BMW', '07/03/1916'),
(2, 'Tesla', '01/01/2003'),
(3, 'Lada', '01/05/1966')

ALTER TABLE Models
ADD CONSTRAINT PK_ModelID Primary Key(ModelID)

ALTER TABLE Manufacturers
ADD CONSTRAINT PK_ManufacturerID Primary Key(ManufacturerID)

ALTER TABLE Models
ADD CONSTRAINT FK_ManufacturerID Foreign Key (ManufacturerID) REFERENCES Manufacturers(ManufacturerID)

--03. Many-To-Many Relationship
CREATE TABLE Students
(
	StudentID INT NOT NULL,
	Name NVARCHAR(50) NOT NULL
)

CREATE TABLE Exams
(
	ExamID INT NOT NULL,
	Name NVARCHAR(50) NOT NULL
)

CREATE TABLE StudentsExams
(
	StudentID INT NOT NULL,
	ExamID INT NOT NULL
)

INSERT INTO Students
VALUES (1, 'Mila'),
(2, 'Toni'),
(3, 'Ron')

INSERT INTO Exams
VALUES (101, 'SpringMVC'),
(102, 'Neo4j'),
(103, 'Oracle 11g')

INSERT INTO StudentsExams
VALUES (1, 101),
(1, 102),
(2, 101),
(3, 103),
(2, 102),
(2, 103)

ALTER TABLE Students
ADD CONSTRAINT PK_StudentID PRIMARY KEY(StudentID)

ALTER TABLE Exams
ADD CONSTRAINT PK_ExamID PRIMARY KEY(ExamID)

ALTER TABLE StudentsExams
ADD CONSTRAINT PK_CompositeStudentAndExamID PRIMARY KEY(StudentID, ExamID)

ALTER TABLE StudentsExams
ADD CONSTRAINT FK_StudentID Foreign Key (StudentID) REFERENCES Students (StudentID)

ALTER TABLE StudentsExams
ADD CONSTRAINT FK_ExamID Foreign Key (ExamID) REFERENCES Exams (ExamID)

--04. Self-Referencing
CREATE TABLE Teachers
(
	TeacherID INT NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	ManagerID INT
)

INSERT INTO Teachers
VALUES (101, 'John', NULL),
(102, 'Maya', 106),
(103, 'Silvia', 106),
(104, 'Ted', 105),
(105, 'Mark', 101),
(106, 'Greta', 101)

ALTER TABLE Teachers
ADD CONSTRAINT PK_TeacherID Primary Key (TeacherID),
CONSTRAINT FK_ManagerID Foreign Key (ManagerID) REFERENCES Teachers (TeacherID)

--05. Online Store Database
USE [master]
GO

CREATE DATABASE OnlineStore
GO

USE [OnlineStore]
GO

CREATE TABLE Orders
(
	OrderID INT NOT NULL Primary Key IDENTITY(1,1),
	CustomerID INT NOT NULL
)

CREATE TABLE Customers
(
	CustomerID INT NOT NULL Primary Key IDENTITY(1,1),
	[Name] varchar(50) NOT NULL,
	Birthday DATE,
	CityID INT NOT NULL
)

CREATE TABLE Cities
(
	CityID INT NOT NULL Primary Key IDENTITY(1,1),
	[Name] varchar(50) NOT NULL
)

CREATE TABLE OrderItems
(
	OrderID INT NOT NULL,
	ItemID INT NOT NULL,
	PRIMARY KEY (OrderID, ItemID)
)

CREATE TABLE Items
(
	ItemID INT NOT NULL Primary Key IDENTITY(1,1),
	[Name] varchar(50) NOT NULL,
	ItemTypeID INT NOT NULL	
)

CREATE TABLE ItemTypes
(
	ItemTypeID INT NOT NULL Primary Key IDENTITY(1,1),
	[Name] varchar(50) NOT NULL
)

ALTER TABLE Orders
ADD CONSTRAINT FK_CustomerID Foreign Key (CustomerID) REFERENCES Customers (CustomerID)

ALTER TABLE Customers
ADD CONSTRAINT FR_CityID Foreign Key (CityID) REFERENCES Cities (CityID)

ALTER TABLE OrderItems
ADD CONSTRAINT FR_OrderID Foreign Key (OrderID) REFERENCES Orders (OrderID)

ALTER TABLE OrderItems
ADD CONSTRAINT FR_ItemID Foreign Key (ItemID) REFERENCES Items (ItemID)

ALTER TABLE Items
ADD CONSTRAINT FR_ItemTypeID Foreign Key (ItemTypeID) REFERENCES ItemTypes (ItemTypeID)

--Problem 6. University Database
USE [master]
GO

CREATE DATABASE University
GO

USE [University]
GO

CREATE TABLE Majors
(
	MajorID INT NOT NULL Primary Key IDENTITY(1,1),
	[Name] VARCHAR(50) NOT NULL
)

CREATE TABLE Students
(
	StudentID INT NOT NULL Primary Key IDENTITY(1,1),
	StudentNumber varchar(50) NOT NULL,
	StudentName varchar(50) NOT NULL,
	MajorID INT NOT NULL
)

CREATE TABLE Payments
(
	PaymentID INT NOT NULL Primary Key IDENTITY(1,1),
	PaymentDate DATE NOT NULL,
	PaymentAmount DECIMAL(10, 2) NOT NULL,
	StudentID INT NOT NULL
)

CREATE TABLE Agenda
(
	StudentID INT NOT NULL IDENTITY(1,1),
	SubjectID INT NOT NULL,
	PRIMARY KEY (StudentID, SubjectID)
)

CREATE TABLE Subjects
(
	SubjectID INT NOT NULL Primary Key IDENTITY(1,1),
	SubjectName varchar(50) NOT NULL
)

ALTER TABLE Payments
ADD CONSTRAINT FK_StudentID FOREIGN KEY (StudentID) REFERENCES Students (StudentID)

ALTER TABLE Students
ADD CONSTRAINT FK_MajorID FOREIGN KEY (MajorID) REFERENCES Majors (MajorID)

ALTER TABLE Agenda
ADD CONSTRAINT FK_StudentID_Agenda FOREIGN KEY (StudentID) REFERENCES Students (StudentID)

ALTER TABLE Agenda
ADD CONSTRAINT FK_SubjectID FOREIGN KEY (SubjectID) REFERENCES Subjects (SubjectID)

--Problem 7. Peaks in Rila
USE [Geography]
GO

--SELECT PeakName, Elevation
--FROM Peaks 
--WHERE MountainId = (SELECT Id FROM Mountains WHERE MountainRange='Rila')
--ORDER BY Elevation DESC

SELECT MountainRange, PeakName, Elevation
FROM Peaks p
JOIN Mountains m ON m.Id = p.MountainId
WHERE p.MountainId = (SELECT Id FROM Mountains WHERE MountainRange='Rila')
ORDER BY Elevation DESC

--OR

SELECT MountainRange, PeakName, Elevation
FROM Peaks p
JOIN Mountains m ON m.Id = p.MountainId
WHERE m.MountainRange = 'Rila'
ORDER BY Elevation DESC
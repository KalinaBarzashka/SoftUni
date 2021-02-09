CREATE DATABASE [TripService]
GO

USE [TripService]
GO

--Problem 01.
CREATE TABLE Cities (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(20) NOT NULL,
    CountryCode CHAR(2) NOT NULL,

    --CONSTRAINT PK_Cities PRIMARY KEY (Id)
)

CREATE TABLE Hotels (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(30) NOT NULL,
    CityId INT NOT NULL,
    EmployeeCount INT NOT NULL,
    BaseRate DECIMAL(18, 2),

    --CONSTRAINT PK_Hotels PRIMARY KEY (Id),
    CONSTRAINT FK_Hotels_Cities FOREIGN KEY (CityId) REFERENCES Cities(Id)
)

CREATE TABLE Rooms (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    Price DECIMAL(18, 2) NOT NULL,
    [Type] NVARCHAR(20) NOT NULL,
    Beds INT NOT NULL,
    HotelId INT NOT NULL,

    --CONSTRAINT PK_Rooms PRIMARY KEY (Id),
    CONSTRAINT FK_Rooms_Hotels FOREIGN KEY (HotelId) REFERENCES Hotels(Id)
)

CREATE TABLE Trips (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    RoomId INT NOT NULL,
    BookDate DATE NOT NULL,
    ArrivalDate DATE NOT NULL,
    ReturnDate DATE NOT NULL,
    CancelDate DATE,

    --CONSTRAINT PK_Trips PRIMARY KEY (Id),
    CONSTRAINT FK_Trips_Rooms FOREIGN KEY (RoomId) REFERENCES Rooms(Id),
    CONSTRAINT CH_Trips_ArrivalDate CHECK (BookDate < ArrivalDate),
    CONSTRAINT CH_Trips_ReturnDate CHECK (ArrivalDate < ReturnDate)
)

CREATE TABLE Accounts (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    FirstName NVARCHAR(50) NOT NULL,
    MiddleName NVARCHAR(20),
    LastName NVARCHAR(50) NOT NULL,
    CityId INT NOT NULL,
    BirthDate DATE NOT NULL,
    Email VARCHAR(100) NOT NULL,

    --CONSTRAINT PK_Accounts PRIMARY KEY (Id),
    CONSTRAINT FK_Accounts_Cities FOREIGN KEY (CityId) REFERENCES Cities(Id),
    CONSTRAINT UQ_Accounts_Email UNIQUE (Email)
)

CREATE TABLE AccountsTrips (
    AccountId INT NOT NULL,
    TripId INT NOT NULL,
    Luggage INT NOT NULL,

    CONSTRAINT PK_AccountsTrips PRIMARY KEY (AccountId, TripId),
    CONSTRAINT FK_AccountsTrips_Accounts FOREIGN KEY (AccountId) REFERENCES Accounts(Id),
    CONSTRAINT FK_AccountsTrips_Trips FOREIGN KEY (TripId) REFERENCES Trips(Id),
    CONSTRAINT CH_AccountsTrips_Luggage CHECK (Luggage >= 0)
)

--Problem 02.
INSERT INTO Accounts (FirstName, MiddleName, LastName, CityId, BirthDate, Email)
VALUES
('John', 'Smith', 'Smith', 34, '1975-07-21', 'j_smith@gmail.com'),
('Gosho', NULL, 'Petrov', 11, '1978-05-16', 'g_petrov@gmail.com'),
('Ivan', 'Petrovich', 'Pavlov', 59, '1849-09-26', 'i_pavlov@softuni.bg'),
('Friedrich', 'Wilhelm', 'Nietzsche', 2, '1844-10-15', 'f_nietzsche@softuni.bg')

INSERT INTO Trips (RoomId, BookDate, ArrivalDate, ReturnDate, CancelDate)
VALUES
(101, '2015-04-12', '2015-04-14', '2015-04-20', '2015-02-02'),
(102, '2015-07-07', '2015-07-15', '2015-07-22', '2015-04-29'),
(103, '2013-07-17', '2013-07-23', '2013-07-24', NULL),
(104, '2012-03-17', '2012-03-31', '2012-04-01', '2012-01-10'),
(109, '2017-08-07', '2017-08-28', '2017-08-29', NULL)

--Problem 03.
UPDATE Rooms
SET Price = Price + 0.14 * Price
WHERE HotelId in (5, 7, 9)

--Problem 04.
DELETE FROM AccountsTrips
      WHERE AccountId = 47

DELETE FROM Accounts
      WHERE Id = 47

--Problem 05.
SELECT  a.FirstName,
		a.LastName,
		FORMAT(a.BirthDate, 'MM-dd-yyyy') AS BirthDate,
		c.Name AS Hometown,
		a.Email
FROM Accounts a
JOIN Cities c ON c.Id = a.CityId
WHERE LEFT(Email, 1) = 'e'
ORDER BY c.Name

--Problem 06.
SELECT c.Name AS City, COUNT(h.Id) AS Hotels
FROM Cities c
JOIN Hotels h ON h.CityId = c.Id
GROUP BY c.Name
ORDER BY Hotels DESC, City

--Problem 07.
SELECT  AccountId,
		CONCAT(FirstName, ' ', LastName) AS FullName,
		MAX(DATEDIFF(DAY, t.ArrivalDate, t.ReturnDate)) AS LongestTrip,
		MIN(DATEDIFF(DAY, t.ArrivalDate, t.ReturnDate)) AS ShortestTrip
FROM Accounts a
JOIN AccountsTrips [at] ON at.AccountId = a.Id
JOIN Trips t ON t.Id = [at].TripId
WHERE a.MiddleName is NULL AND t.CancelDate is NULL
GROUP BY AccountId, CONCAT(FirstName, ' ', LastName)
ORDER BY LongestTrip DESC, ShortestTrip

--Problem 08.
SELECT TOP(10)
		c.Id,
		c.Name AS City,
		c.CountryCode AS Country,
		COUNT(a.Id) AS Accounts
FROM Cities c
JOIN Accounts a ON a.CityId = c.Id
GROUP BY c.Id, c.name, c.CountryCode
ORDER BY Accounts DESC

--Problem 09.
SELECT a.Id,
       a.Email,
       c.Name AS [Town],
       COUNT(c.Name) AS [Trips]
FROM Accounts a
JOIN AccountsTrips [at] ON at.AccountId = a.Id
JOIN Trips t ON t.Id = [at].TripId
JOIN Cities c ON c.Id = a.CityId
JOIN Rooms r ON r.Id = T.RoomId
JOIN Hotels h ON h.Id = r.HotelId
WHERE a.CityId = h.CityId
GROUP BY a.Id, a.Email, c.Name
ORDER BY [Trips] DESC, a.Id

--Problem 10.
WITH cte_AccountsToCity 
AS
(
        SELECT ht.Id AS [HotelTownId],
               c.Name AS [HotelTown]
          FROM Cities c
    INNER JOIN Hotels ht
            ON ht.CityId = c.Id
)

SELECT  t.Id,
		CONCAT_WS(' ', a.FirstName, a.MiddleName, a.LastName) AS [FullName],
		--a.FirstName + ' ' + ISNULL(a.MiddleName + ' ', '') + a.LastName AS [FullName],
		c.[Name] AS [From],
		cte.HotelTown AS [To],
		CASE
			WHEN t.CancelDate IS NOT NULL THEN 'Canceled'
			ELSE CONCAT(DATEDIFF(DAY, t.ArrivalDate, t.ReturnDate), ' days')
		END AS [Duration]
FROM Trips t
INNER JOIN AccountsTrips [at] ON [at].TripId = t.Id
LEFT JOIN Accounts a ON a.Id = [at].AccountId
LEFT JOIN Cities c ON c.Id = a.CityId
LEFT JOIN Rooms r ON r.Id = t.RoomId
LEFT JOIN cte_AccountsToCity cte ON cte.HotelTownId = r.HotelId
ORDER BY FullName, at.TripId

--Problem 11.
CREATE OR ALTER FUNCTION udf_GetAvailableRoom(@HotelId INT, @Date DATE, @People INT)
RETURNS VARCHAR(50)
AS
	BEGIN
		DECLARE @baseRate DECIMAL(9, 2) = (
			SELECT BaseRate
			FROM [Hotels] h
			WHERE h.Id = @HotelId);

		DECLARE @roomTable TABLE (
			Id INT,
			[Type] nvarchar(20),
			Beds INT,
			Price DECIMAL(9,2))
		
		INSERT INTO @roomTable
			SELECT TOP(1) r.Id, r.Type, r.Beds, r.Price
			FROM Trips t
			LEFT JOIN Rooms r ON r.Id = t.RoomId
			LEFT JOIN Hotels h ON r.HotelId = h.Id
			WHERE r.HotelId = @HotelId
					AND r.Beds >= @People
					AND (@Date NOT BETWEEN t.ArrivalDate AND t.ReturnDate)
					AND t.CancelDate IS NULL
			ORDER BY r.Price DESC;

		DECLARE @roomPrice DECIMAL(9, 2) = (
			SELECT Price
			FROM @roomTable)

		IF ((SELECT COUNT(*) FROM @roomTable) < 1)
			RETURN 'No rooms available';

		DECLARE @roomId INT = (
			SELECT Id
			FROM @roomTable)

		DECLARE @roomType nvarchar(20) = (
			SELECT [Type]
			FROM @roomTable)

		DECLARE @roomBeds INT = (
			SELECT Beds
			FROM @roomTable)

		DECLARE @totalPrice DECIMAL(9, 2) = (@baseRate + @roomPrice) * @People;

		RETURN CONCAT('Room ', @roomId, ': ', @roomType, ' (', @roomBeds, ' beds) - $', @totalPrice) 
	END
GO

SELECT dbo.udf_GetAvailableRoom(112, '2011-12-17', 2)

SELECT dbo.udf_GetAvailableRoom(94, '2015-07-26', 3)

--Problem 12.
CREATE PROC usp_SwitchRoom(@TripId INT, @TargetRoomId INT)
AS
	BEGIN
	DECLARE @currentHotelId INT = (
		SELECT r.HotelId
		FROM Hotels h
		JOIN Rooms r ON r.HotelId = h.Id
		JOIN Trips t ON t.RoomId = r.Id
		WHERE t.Id = @TripId
	)

	DECLARE @newHotelId INT = (
		SELECT r.HotelId
		FROM Hotels h
		JOIN Rooms r ON r.HotelId = h.Id
		WHERE r.Id = @TargetRoomId
	)

	IF @currentHotelId <> @newHotelId
	BEGIN
        RAISERROR('Target room is in another hotel!', 16, 1)
        RETURN
    END

	DECLARE @countAccounts INT = (
		SELECT COUNT(*)
		FROM AccountsTrips [at]
		JOIN Trips t ON t.Id = [at].TripId
		WHERE t.Id = @TripId
	)

	DECLARE @bedsInRoom INT = (
		SELECT Beds
		FROM Rooms r
		WHERE r.Id = @TargetRoomId
	)

	IF @countAccounts > @bedsInRoom
		BEGIN
        RAISERROR('Not enough beds in target room!', 16, 1)
        RETURN
    END

	UPDATE Trips
	SET RoomId = @TargetRoomId
	WHERE Id = @TripId
	END
GO

CREATE PROC usp_SwitchRoom(@TripId INT, @TargetRoomId INT)
AS
BEGIN
    DECLARE @OldHotelId INT
    SET @OldHotelId = (    SELECT h.Id
                             FROM Hotels h
                       INNER JOIN Rooms r
                               ON r.HotelId = h.Id
                       INNER JOIN Trips t
                               ON t.RoomId = r.Id
                            WHERE t.id = @TripId)

    DECLARE @NewHotelId INT
    SET @NewHotelId = (    SELECT h.Id
                             FROM Hotels h
                       INNER JOIN Rooms r
                               ON r.HotelId = h.Id
                            WHERE r.Id = @TargetRoomId)

    IF (@OldHotelId <> @NewHotelId)
    BEGIN
        RAISERROR('Target room is in another hotel!', 16, 1)
        RETURN
    END

    DECLARE @TripAccounts INT
    SET @TripAccounts = (SELECT COUNT(ats.TripId) 
                           FROM AccountsTrips ats 
                          WHERE ats.TripId = @TripId)

    DECLARE @RoomBeds INT
    SET @RoomBeds = (SELECT r.Beds 
                       FROM Rooms r 
                      WHERE r.Id = @TargetRoomId)

    IF (@TripAccounts > @RoomBeds)
    BEGIN
        RAISERROR('Not enough beds in target room!', 16, 1)
        RETURN
    END

    BEGIN TRANSACTION
        UPDATE Trips
           SET RoomId = @TargetRoomId
         WHERE Id = @TripId
    COMMIT
END
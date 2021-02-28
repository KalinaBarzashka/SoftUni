CREATE TABLE Countries(
	Id INT PRIMARY KEY IDENTITY,
	Name nvarchar(50)
)
GO

CREATE TABLE Towns(
	Id INT PRIMARY KEY IDENTITY,
	Name nvarchar(50),
	CountryCode INT FOREIGN KEY REFERENCES Countries(Id)
)
GO

CREATE TABLE Minions(
	Id INT PRIMARY KEY IDENTITY,
	Name nvarchar(50),
	Age INT,
	TownId INT FOREIGN KEY REFERENCES Towns(Id)
)
GO

CREATE TABLE EvilnessFactors(
	Id INT PRIMARY KEY IDENTITY,
	Name nvarchar(50)
)
GO

CREATE TABLE Villains(
	Id INT PRIMARY KEY IDENTITY,
	Name nvarchar(50),
	EvilnessFactorId INT FOREIGN KEY REFERENCES EvilnessFactors(Id)
)
GO

CREATE TABLE MinionsVillains(
	MinionId INT FOREIGN KEY REFERENCES Minions(Id),
	VillianId INT FOREIGN KEY REFERENCES Villains(Id),
	CONSTRAINT PK_MinionsVillains PRIMARY KEY (MinionId, VillianId)
)
GO

--INSERT STATEMENTS
INSERT INTO Countries (Name) VALUES (1, 'Bulgaria'), (2, 'Norway'), (3, 'Cyprus'), (4, 'Greece'), (5, 'UK')

INSERT INTO Towns(Id, Name, CountryCode) VALUES (1, 'Plovdiv', 1), (2, 'Oslo', 2), (3, 'Larnaca',3), (4, 'Athens', 4), (5, 'London', 5)

INSERT INTO Minions VALUES (1, 'Kalina', 22, 2), (2, 'Kristian', 26, 2), (3, 'Pesho', 14, 1), (4, 'Miro', 19, 4), (5, 'Lucifer', 30, 3)

INSERT INTO EvilnessFactors VALUES (1, 'super good'), (2, 'good'), (3, 'bad'), (4, 'evil'), (5, 'super evil')

INSERT INTO Villains VALUES (1, 'Gru', 1), (2, 'Ivo', 2), (3, 'Teo', 3), (4, 'Sto', 4), (5, 'Pro', 5)

INSERT INTO MinionsVillains VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5)
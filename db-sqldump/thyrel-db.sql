-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 13, 2021 at 11:16 AM
-- Server version: 8.0.23
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE if exists thyrel_db;

-- Création d'un nouvelle base de donnée

CREATE DATABASE IF NOT EXISTS thyrel_db;

-- Utilisation de cette base de donnée

USE thyrel_db;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thyrel_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Element`
--

CREATE TABLE `Element` (
  `id` int NOT NULL,
  `SessionId` int NOT NULL,
  `CreatorId` int NOT NULL,
  `InitiatorId` int NOT NULL,
  `Type` int NOT NULL,
  `Text` text,
  `DrawingId` int DEFAULT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `Step` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DrawImage` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Element`
--

INSERT INTO `Element` (`id`, `SessionId`, `CreatorId`, `InitiatorId`, `Type`, `Text`, `DrawingId`, `FinishAt`, `Step`, `CreatedAt`, `DrawImage`) VALUES
(1, 9, 26, 26, 0, '', NULL, NULL, 1, '2021-03-17 18:52:53', NULL),
(2, 9, 27, 27, 0, '', NULL, NULL, 1, '2021-03-17 18:52:53', NULL),
(3, 9, 28, 28, 0, '', NULL, NULL, 1, '2021-03-17 18:52:53', NULL),
(4, 9, 26, 28, 1, NULL, NULL, NULL, 2, '2021-03-17 18:53:03', NULL),
(5, 9, 27, 26, 1, NULL, NULL, NULL, 2, '2021-03-17 18:53:03', NULL),
(6, 9, 28, 27, 1, NULL, NULL, NULL, 2, '2021-03-17 18:53:03', NULL),
(7, 9, 26, 27, 0, '', NULL, NULL, 3, '2021-03-17 18:53:13', NULL),
(8, 9, 27, 28, 0, '', NULL, NULL, 3, '2021-03-17 18:53:13', NULL),
(9, 9, 28, 26, 0, '', NULL, NULL, 3, '2021-03-17 18:53:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Player`
--

CREATE TABLE `Player` (
  `Id` int NOT NULL,
  `Username` varchar(255) NOT NULL,
  `AvatarUrl` text NOT NULL,
  `IsOwner` tinyint(1) NOT NULL DEFAULT '0',
  `DisableAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RoomId` int DEFAULT NULL,
  `IsPlaying` tinyint(1) NOT NULL DEFAULT '0',
  `IsConnected` tinyint(1) NOT NULL DEFAULT '1',
  `TokenId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Player`
--

INSERT INTO `Player` (`Id`, `Username`, `AvatarUrl`, `IsOwner`, `DisableAt`, `CreatedAt`, `RoomId`, `IsPlaying`, `IsConnected`, `TokenId`) VALUES
(26, 'Didier', '0', 1, NULL, '2021-03-17 18:52:31', 23, 1, 1, 49),
(27, 'Patrick', '0', 0, NULL, '2021-03-17 18:52:39', 23, 1, 1, 50),
(28, 'Jean', '0', 0, NULL, '2021-03-17 18:52:49', 23, 1, 1, 51),
(29, 'Alex', '1', 1, NULL, '2021-04-21 08:29:41', 24, 0, 0, 52),
(30, 'Bob Razowski', '2', 0, NULL, '2021-04-21 08:29:54', 24, 0, 0, 53);

-- --------------------------------------------------------

--
-- Table structure for table `Reaction`
--

CREATE TABLE `Reaction` (
  `Id` int NOT NULL,
  `ElementId` int DEFAULT NULL,
  `PlayerId` int DEFAULT NULL,
  `Emoji` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `Room` (
  `Id` int NOT NULL,
  `Mode` int DEFAULT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Identifier` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Room`
--

INSERT INTO `Room` (`Id`, `Mode`, `FinishAt`, `CreatedAt`, `Identifier`) VALUES
(23, NULL, NULL, '2021-02-17 11:38:58', 'Vy0nWtXyTJ7JipVz'),
(24, NULL, '2021-04-21 08:35:32', '2021-04-21 08:29:40', 'Q56hteDtu5IK');

-- --------------------------------------------------------

--
-- Table structure for table `Session`
--

CREATE TABLE `Session` (
  `Id` int NOT NULL,
  `Mode` int DEFAULT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `StepFinishAt` datetime DEFAULT NULL,
  `ActualStep` int DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RoomId` int NOT NULL,
  `AlbumInitiatorId` int DEFAULT NULL,
  `BookState` int DEFAULT 0,
  `TimeDuration` int NOT NULL,
  `StepType` int NOT NULL,
  `TotalPlayers` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Session`
--

INSERT INTO `Session` (`Id`, `FinishAt`, `StepFinishAt`, `ActualStep`, `CreatedAt`, `RoomId`, `AlbumInitiatorId`, `TimeDuration`, `StepType`, `TotalPlayers`, `BookState`) VALUES
(9, NULL, NULL, 2, '2021-02-17 18:00:18', 23, NULL, 120, 12, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Token`
--

CREATE TABLE `Token` (
  `Id` int NOT NULL,
  `DiscardAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TokenKey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Token`
--

INSERT INTO `Token` (`Id`, `DiscardAt`, `CreatedAt`, `TokenKey`) VALUES
(49, NULL, '2021-03-17 18:52:31', 'UcHRAOTuuQR03AyP'),
(50, NULL, '2021-03-17 18:52:39', 'ibEhpN19Uro3mt5Y'),
(51, NULL, '2021-03-17 18:52:49', 'XZ4bnf2C53WxdiZO'),
(52, NULL, '2021-04-21 08:29:41', 'RPtCVtF9mVe57uIT'),
(53, NULL, '2021-04-21 08:29:54', 'M0bi96EXn1hpx7L7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Element`
--
ALTER TABLE `Element`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sessionid` (`SessionId`),
  ADD KEY `fk_creatorid` (`CreatorId`),
  ADD KEY `fk_initiatorid` (`InitiatorId`);

--
-- Indexes for table `Player`
--
ALTER TABLE `Player`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_roomid2` (`RoomId`),
  ADD KEY `fk_tokenid` (`TokenId`);

--
-- Indexes for table `Reaction`
--
ALTER TABLE `Reaction`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_element_id_reaction` (`ElementId`),
  ADD KEY `fk_player_id_reaction` (`PlayerId`);

--
-- Indexes for table `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `idx_room_identifier` (`Identifier`);

--
-- Indexes for table `Session`
--
ALTER TABLE `Session`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_roomid` (`RoomId`);

--
-- Indexes for table `Token`
--
ALTER TABLE `Token`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `idx_token_tokenkey` (`TokenKey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Element`
--
ALTER TABLE `Element`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Player`
--
ALTER TABLE `Player`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Reaction`
--
ALTER TABLE `Reaction`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Room`
--
ALTER TABLE `Room`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Session`
--
ALTER TABLE `Session`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Token`
--
ALTER TABLE `Token`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Element`
--
ALTER TABLE `Element`
  ADD CONSTRAINT `fk_creatorid` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Player`
--
ALTER TABLE `Player`
  ADD CONSTRAINT `fk_roomid_player` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_tokenid_player` FOREIGN KEY (`TokenId`) REFERENCES `Token` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Reaction`
--
ALTER TABLE `Reaction`
  ADD CONSTRAINT `fk_element_id_reaction` FOREIGN KEY (`ElementId`) REFERENCES `Element` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_player_id_reaction` FOREIGN KEY (`PlayerId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `fk_roomid` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Feb 17, 2021 at 07:36 AM
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
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  `RoomId` int NOT NULL,
  `IsPlaying` tinyint(1) NOT NULL DEFAULT '0',
  `IsConnected` tinyint(1) NOT NULL DEFAULT '1',
  `TokenId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Player`
--

INSERT INTO `Player` (`Id`, `Username`, `AvatarUrl`, `IsOwner`, `DisableAt`, `CreatedAt`, `RoomId`, `IsPlaying`, `IsConnected`, `TokenId`) VALUES
(21, 'Mathieu', '1', 1, NULL, '2021-02-17 11:38:59', 22, 0, 1, 44),
(22, 'Alexogros', '0', 1, NULL, '2021-02-17 14:42:34', 22, 0, 1, 45),
(23, 'LeDrogay', '4', 1, NULL, '2021-02-17 14:49:40', 22, 0, 1, 46),
(24, 'Melvynien', '6', 1, NULL, '2021-02-17 14:50:12', 22, 0, 1, 47),
(25, 'SuperPower', '1', 1, NULL, '2021-02-17 14:51:24', 22, 0, 1, 48);

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `Room` (
  `Id` int NOT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Identifier` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Room`
--

INSERT INTO `Room` (`Id`, `Identifier`, `FinishAt`, `CreatedAt`) VALUES
(22, 'Vy0nWtXyTJ7JipVz', NULL, '2021-02-17 11:38:58');

-- --------------------------------------------------------

--
-- Table structure for table `Session`
--

CREATE TABLE `Session` (
  `Id` int NOT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `StepFinishAt` datetime DEFAULT NULL,
  `ActualStep` int DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RoomId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Session`
--

INSERT INTO `Session` (`Id`, `FinishAt`, `StepFinishAt`, `ActualStep`, `CreatedAt`, `RoomId`) VALUES
(8, NULL, NULL, 2, '2021-02-17 18:00:18', 22);

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
(41, 'cgx2QLoJHdwHNJ1V', NULL, '2021-02-07 11:48:45'),
(42, 'g-S2VA-h3yBJIrf5', NULL, '2021-02-07 11:54:41'),
(43, '7TVlYbudEIMQf5pw', NULL, '2021-02-17 11:35:12'),
(44, 'u0vJ0wB0nhDOKnQb', NULL, '2021-02-17 11:38:59'),
(45, 'ixhEcnWDVmXLlhc3', NULL, '2021-02-17 14:42:33'),
(46, 'n..m.4vB8I0rnyFu', NULL, '2021-02-17 14:49:40'),
(47, 'wqAihfmHw6AJKx8c', NULL, '2021-02-17 14:50:12'),
(48, '4ruOuZyHbfFMZF7E', NULL, '2021-02-17 14:51:24');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Player`
--
ALTER TABLE `Player`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `Room`
--
ALTER TABLE `Room`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Session`
--
ALTER TABLE `Session`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Token`
--
ALTER TABLE `Token`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
-- Constraints for table `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `fk_roomid` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
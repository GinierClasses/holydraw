-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Feb 02, 2021 at 06:13 PM
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
-- Table structure for table `Drawing`
--

CREATE TABLE `Drawing` (
  `Id` int NOT NULL,
  `Step` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatorId` int NOT NULL,
  `InitiatorId` int NOT NULL,
  `SessionId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Player`
--

CREATE TABLE `Player` (
  `Id` int NOT NULL,
  `Username` varchar(255) NOT NULL,
  `AvatarUrl` text NOT NULL,
  `IsOwner` tinyint(1) NOT NULL,
  `DisableAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RoomId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Room`
--

CREATE TABLE `Room` (
  `Id` int NOT NULL,
  `Identifier` text NOT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Sentence`
--

CREATE TABLE `Sentence` (
  `Id` int NOT NULL,
  `Text` text NOT NULL,
  `Step` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatorId` int NOT NULL,
  `InitiatorId` int NOT NULL,
  `SessionId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Session`
--

CREATE TABLE `Session` (
  `Id` int NOT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RoomId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Token`
--

CREATE TABLE `Token` (
  `Id` int NOT NULL,
  `Token` text NOT NULL,
  `DiscardAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PlayerId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Drawing`
--
ALTER TABLE `Drawing`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_creatorid_2` (`CreatorId`),
  ADD KEY `fk_initiatorid_2` (`InitiatorId`),
  ADD KEY `fk_sessionid2` (`SessionId`);

--
-- Indexes for table `Player`
--
ALTER TABLE `Player`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_roomid2` (`RoomId`);

--
-- Indexes for table `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Sentence`
--
ALTER TABLE `Sentence`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_creatorid` (`CreatorId`),
  ADD KEY `fk_initiatorid` (`InitiatorId`),
  ADD KEY `fk_sessionid` (`SessionId`);

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
  ADD KEY `fk_playerid` (`PlayerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Drawing`
--
ALTER TABLE `Drawing`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Player`
--
ALTER TABLE `Player`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Room`
--
ALTER TABLE `Room`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Sentence`
--
ALTER TABLE `Sentence`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Session`
--
ALTER TABLE `Session`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Token`
--
ALTER TABLE `Token`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Drawing`
--
ALTER TABLE `Drawing`
  ADD CONSTRAINT `fk_creatorid_2` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid_2` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid2` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Player`
--
ALTER TABLE `Player`
  ADD CONSTRAINT `fk_roomid2` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Sentence`
--
ALTER TABLE `Sentence`
  ADD CONSTRAINT `fk_creatorid` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `fk_roomid` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Token`
--
ALTER TABLE `Token`
  ADD CONSTRAINT `fk_playerid` FOREIGN KEY (`PlayerId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

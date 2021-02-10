-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Feb 03, 2021 at 09:41 AM
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
-- Base de données : `thyrel_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `Drawing`
--

CREATE TABLE `Drawing` (
  `Id` int NOT NULL,
  `Step` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatorId` int NOT NULL,
  `InitiatorId` int NOT NULL,
  `SessionId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Drawing`
--

INSERT INTO `Drawing` (`Id`, `Step`, `CreatedAt`, `CreatorId`, `InitiatorId`, `SessionId`) VALUES
(2, 2, '2021-02-06 14:18:34', 6, 6, 7);

-- --------------------------------------------------------

--
-- Structure de la table `Player`
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
  `TokenId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Player`
--

INSERT INTO `Player` (`Id`, `Username`, `AvatarUrl`, `IsOwner`, `DisableAt`, `CreatedAt`, `RoomId`, `IsPlaying`, `TokenId`) VALUES
(6, 'JeanMichel', 'https://google.com', 0, NULL, '2021-02-06 14:17:19', 7, 0, 30),
(17, 'Robotope', 'todo', 1, NULL, '2021-02-07 11:47:41', 18, 0, 40),
(18, 'Allurisant', 'todo', 1, NULL, '2021-02-07 11:48:45', 19, 0, 41),
(19, 'Jandidier', 'todo', 1, NULL, '2021-02-07 11:54:41', 20, 0, 42);

-- --------------------------------------------------------

--
-- Structure de la table `Room`
--

CREATE TABLE `Room` (
  `Id` int NOT NULL,
  `Identifier` text NOT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Room`
--

INSERT INTO `Room` (`Id`, `Identifier`, `FinishAt`, `CreatedAt`) VALUES
(7, 'aslasq248129anskllknad', NULL, '2021-02-06 14:15:48'),
(18, 'iWSJDD4xLT05', NULL, '2021-02-07 11:47:40'),
(19, 'uCFj7F0rc42O', NULL, '2021-02-07 11:48:44'),
(20, 'msIOpgvWKtBs', NULL, '2021-02-07 11:54:41');

-- --------------------------------------------------------

--
-- Structure de la table `Sentence`
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

--
-- Déchargement des données de la table `Sentence`
--

INSERT INTO `Sentence` (`Id`, `Text`, `Step`, `CreatedAt`, `CreatorId`, `InitiatorId`, `SessionId`) VALUES
(2, 'Un chien unijamboste', 1, '2021-02-06 14:18:18', 6, 6, 7);

-- --------------------------------------------------------

--
-- Structure de la table `Session`
--

CREATE TABLE `Session` (
  `Id` int NOT NULL,
  `FinishAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RoomId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Session`
--

INSERT INTO `Session` (`Id`, `FinishAt`, `CreatedAt`, `RoomId`) VALUES
(7, NULL, '2021-02-06 14:17:57', 7);

-- --------------------------------------------------------

--
-- Structure de la table `Token`
--

CREATE TABLE `Token` (
  `Id` int NOT NULL,
  `TokenKey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DiscardAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Token`
--

INSERT INTO `Token` (`Id`, `TokenKey`, `DiscardAt`, `CreatedAt`) VALUES
(30, 'Mb3JdKHHhN123Huk', NULL, '2021-02-06 14:16:40'),
(38, 'Mb3JdKHHhNrz7Huk', NULL, '2021-02-06 16:08:14'),
(39, 'bVmIa4A3HwqQm6x2', NULL, '2021-02-06 21:36:26'),
(40, 'jrm7ZmiGqR729vOp', NULL, '2021-02-07 11:47:40'),
(41, 'cgx2QLoJHdwHNJ1V', NULL, '2021-02-07 11:48:45'),
(42, 'g-S2VA-h3yBJIrf5', NULL, '2021-02-07 11:54:41');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Drawing`
--
ALTER TABLE `Drawing`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_creatorid_2` (`CreatorId`),
  ADD KEY `fk_initiatorid_2` (`InitiatorId`),
  ADD KEY `fk_sessionid2` (`SessionId`);

--
-- Index pour la table `Player`
--
ALTER TABLE `Player`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_roomid2` (`RoomId`),
  ADD KEY `fk_tokenid` (`TokenId`);

--
-- Index pour la table `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `Sentence`
--
ALTER TABLE `Sentence`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_creatorid` (`CreatorId`),
  ADD KEY `fk_initiatorid` (`InitiatorId`),
  ADD KEY `fk_sessionid` (`SessionId`);

--
-- Index pour la table `Session`
--
ALTER TABLE `Session`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_roomid` (`RoomId`);

--
-- Index pour la table `Token`
--
ALTER TABLE `Token`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Drawing`
--
ALTER TABLE `Drawing`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Player`
--
ALTER TABLE `Player`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `Room`
--
ALTER TABLE `Room`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `Sentence`
--
ALTER TABLE `Sentence`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Session`
--
ALTER TABLE `Session`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `Token`
--
ALTER TABLE `Token`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Drawing`
--
ALTER TABLE `Drawing`
  ADD CONSTRAINT `fk_creatorid_drawing` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid_drawing` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid_drawing` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Player`
--
ALTER TABLE `Player`
  ADD CONSTRAINT `fk_roomid_player` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_tokenid_player` FOREIGN KEY (`TokenId`) REFERENCES `Token` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Sentence`
--
ALTER TABLE `Sentence`
  ADD CONSTRAINT `fk_creatorid_sentence` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid_sentence` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid_sentence` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `fk_roomid` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

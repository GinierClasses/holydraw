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
(1, 2, '2021-02-03 09:36:09', 1, 1, 1);

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
  `IsPlaying` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Player`
--

INSERT INTO `Player` (`Id`, `Username`, `AvatarUrl`, `IsOwner`, `DisableAt`, `CreatedAt`, `RoomId`, `IsPlaying`) VALUES
(1, 'LapouilleLafripouille', 'Https://www.urldeouf.com', 0, NULL, '2021-02-03 09:32:54', 1, 0);

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
(1, 'AJSHAIAIO290392JIJSOAjJ\"*\"*', NULL, '2021-02-03 09:31:26'),
(2, 'xhrjBBfF', NULL, '2021-02-05 20:23:28');

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
(1, 'Un singe qui fait le singe', 1, '2021-02-03 09:35:43', 1, 1, 1);

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
(1, NULL, '2021-02-03 09:33:35', 1),
(2, NULL, '2021-02-03 11:34:44', 1),
(3, NULL, '2021-02-03 11:36:21', 1),
(4, NULL, '2021-02-03 13:31:00', 1),
(5, '2021-02-03 13:34:37', '2021-02-03 13:34:37', 1),
(6, '2021-02-03 13:36:26', '2021-02-03 13:36:26', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Token`
--

CREATE TABLE `Token` (
  `Id` int NOT NULL,
  `TokenKey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DiscardAt` datetime DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PlayerId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Token`
--

INSERT INTO `Token` (`Id`, `TokenKey`, `DiscardAt`, `CreatedAt`, `PlayerId`) VALUES
(1, 'TOK::AJ323NANJ::AJJAJ', NULL, '2021-02-03 09:34:52', 1),
(2, 'blabla', NULL, '2021-02-03 11:21:24', 1),
(3, 'jdRgzNOE', NULL, '2021-02-04 15:39:16', 1),
(4, 'pl1FVbtlJm0K3cnp', NULL, '2021-02-05 13:50:23', 1),
(5, 'gNY3q83UC80xbA6c', NULL, '2021-02-05 13:51:11', 1),
(6, 'efiwqhifqwhiqwpqwpojfqwopjqfwjpofqwfwq', NULL, '2021-02-05 12:51:44', 1),
(7, 'epiwqjfwejopfqpjofqwqfw', NULL, '2021-02-05 12:51:52', 1),
(8, 'QcjFoxasB6ASTIZu', NULL, '2021-02-05 13:52:04', 1),
(9, 'hcQqPZ9hsGi2uuFm', NULL, '2021-02-05 13:52:06', 1),
(10, 'RSKQQPjoVinOTAqk', NULL, '2021-02-05 13:52:46', 1),
(11, 'LTdRdmaDkNa.qrtk', NULL, '2021-02-05 13:55:02', 1),
(12, 'q9S-YviYFS6aDnx.', NULL, '2021-02-05 13:56:41', 1),
(13, 'cSrDamdaMXJZGT35', NULL, '2021-02-05 13:56:59', 1),
(14, 'sNp5jE.37W3dD52u', NULL, '2021-02-05 13:57:16', 1),
(15, 'IsxdQYVK94WzQpnI', NULL, '2021-02-05 13:57:31', 1);

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
  ADD KEY `fk_roomid2` (`RoomId`);

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
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_playerid` (`PlayerId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Drawing`
--
ALTER TABLE `Drawing`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Player`
--
ALTER TABLE `Player`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Room`
--
ALTER TABLE `Room`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Sentence`
--
ALTER TABLE `Sentence`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Session`
--
ALTER TABLE `Session`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Token`
--
ALTER TABLE `Token`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Drawing`
--
ALTER TABLE `Drawing`
  ADD CONSTRAINT `fk_creatorid_2` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid_2` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid2` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Player`
--
ALTER TABLE `Player`
  ADD CONSTRAINT `fk_roomid2` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Sentence`
--
ALTER TABLE `Sentence`
  ADD CONSTRAINT `fk_creatorid` FOREIGN KEY (`CreatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_initiatorid` FOREIGN KEY (`InitiatorId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_sessionid` FOREIGN KEY (`SessionId`) REFERENCES `Session` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `fk_roomid` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Token`
--
ALTER TABLE `Token`
  ADD CONSTRAINT `fk_playerid` FOREIGN KEY (`PlayerId`) REFERENCES `Player` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

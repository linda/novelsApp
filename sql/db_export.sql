-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2016 at 12:44 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ba_novels`
--

-- --------------------------------------------------------

--
-- Table structure for table `novel`
--

CREATE TABLE `novel` (
  `Tag` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Title` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `Author` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `Edited` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Published_start` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Published_end` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `Setting_year_start` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Setting_year_end` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Download_link` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Summary` int(11) DEFAULT NULL,
  `Completed` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `language` enum('FR','EN','DE','O','') COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `novel`
--

INSERT INTO `novel` (`Tag`, `Title`, `Author`, `Edited`, `Published_start`, `Published_end`, `Setting_year_start`, `Setting_year_end`, `Download_link`, `ID`, `Summary`, `Completed`, `language`) VALUES
('3_MOUS', 'The Three Musketeers', 'Alexandre Dumas', '2016-08-21 15:44:45', NULL, '1844', '1625', '1628', 'http://www.ebooksgratuits.com/details.php?book=318', 11, 0, 'Y', 'FR'),
('RAOUL', 'The Vicomte of Bragelonne: Ten Years Later', 'Alexandre Dumas', '2016-08-21 15:54:20', '1847', '1850', '1660', '1673', 'http://www.ebooksgratuits.com/details.php?book=320', 13, 0, 'Y', 'FR'),
('20_ANS', 'Twenty Years Later', 'Alexandre Dumas', '2016-08-21 15:56:57', NULL, '1845', '1648', '1649', 'http://www.ebooksgratuits.com/details.php?book=319', 14, 0, 'Y', 'FR');

-- --------------------------------------------------------

--
-- Table structure for table `novel_person`
--

CREATE TABLE `novel_person` (
  `novel_id` bigint(20) NOT NULL,
  `person_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `novel_person`
--

INSERT INTO `novel_person` (`novel_id`, `person_id`) VALUES
(11, 1),
(11, 2);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name_fr` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dates` varchar(21) COLLATE utf8_unicode_ci DEFAULT NULL,
  `details` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `name_en`, `name_fr`, `dates`, `details`) VALUES
(1, 'Cardinal Richelieu', NULL, NULL, NULL),
(2, 'Louis XIII', NULL, NULL, NULL),
(3, 'Marie of Medici', NULL, NULL, NULL),
(4, 'Cardinal Mazarin', NULL, NULL, NULL),
(5, 'Anne of Austria', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `novel`
--
ALTER TABLE `novel`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD UNIQUE KEY `Tag` (`Tag`);

--
-- Indexes for table `novel_person`
--
ALTER TABLE `novel_person`
  ADD PRIMARY KEY (`novel_id`,`person_id`),
  ADD UNIQUE KEY `novel_id` (`novel_id`,`person_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `novel`
--
ALTER TABLE `novel`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

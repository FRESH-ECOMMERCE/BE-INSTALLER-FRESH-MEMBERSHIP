-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 12, 2026 at 10:01 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fresh-membership`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `banner_id` int NOT NULL,
  `banner_image` text NOT NULL,
  `banner_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`created_at`, `updated_at`, `deleted_at`, `deleted`, `banner_id`, `banner_image`, `banner_order`) VALUES
('2026-03-11 17:23:31', '2026-03-11 17:23:31', NULL, 0, 1, 'https://fastly.picsum.photos/id/109/800/400.jpg?hmac=gVDWcd0U95zMO710vpPcqPY_2qEj71GUZQIFESX20xM', 1),
('2026-03-11 17:24:05', '2026-03-11 23:35:35', NULL, 1, 2, 'https://fastly.picsum.photos/id/365/800/400.jpg?hmac=v_GiRsEOXSVn-e1UCl2xFeicLmDdEPNQOkKHOEz59SQ', 2),
('2026-03-11 23:35:03', '2026-03-12 10:51:41', NULL, 1, 3, 'https://fastly.picsum.photos/id/365/800/400.jpg?hmac=v_GiRsEOXSVn-e1UCl2xFeicLmDdEPNQOkKHOEz59SQ', 3),
('2026-03-11 23:35:11', '2026-03-11 23:40:22', NULL, 1, 4, 'https://fastly.picsum.photos/id/365/800/400.jpg?hmac=v_GiRsEOXSVn-e1UCl2xFeicLmDdEPNQOkKHOEz59SQ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `memberships`
--

CREATE TABLE `memberships` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `membership_id` int NOT NULL,
  `membership_user_id` int NOT NULL,
  `membership_code` varchar(255) NOT NULL,
  `membership_point` int NOT NULL,
  `membership_point_in_idr` decimal(10,2) NOT NULL,
  `membership_category` enum('gold','silver','platinum') NOT NULL DEFAULT 'silver'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `memberships`
--

INSERT INTO `memberships` (`created_at`, `updated_at`, `deleted_at`, `deleted`, `membership_id`, `membership_user_id`, `membership_code`, `membership_point`, `membership_point_in_idr`, `membership_category`) VALUES
('2026-03-12 11:07:51', '2026-03-12 14:38:25', NULL, 0, 1, 1, 'JOH-6281234567890', 55800, 5580000.00, 'silver'),
('2026-03-12 15:19:31', '2026-03-12 15:19:31', NULL, 0, 2, 2, 'JAC-628123456789', 0, 0.00, 'silver');

-- --------------------------------------------------------

--
-- Table structure for table `point_convertions`
--

CREATE TABLE `point_convertions` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `point_convertion_id` int NOT NULL,
  `point_convertion_point` int NOT NULL,
  `point_convertion_point_in_idr` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `point_convertions`
--

INSERT INTO `point_convertions` (`created_at`, `updated_at`, `deleted_at`, `deleted`, `point_convertion_id`, `point_convertion_point`, `point_convertion_point_in_idr`) VALUES
('2026-03-12 11:15:13', '2026-03-12 11:15:23', NULL, 0, 1, 1, 100.00);

-- --------------------------------------------------------

--
-- Table structure for table `point_transactions`
--

CREATE TABLE `point_transactions` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `point_transaction_id` int NOT NULL,
  `point_transaction_user_id` int NOT NULL,
  `point_transaction_membership_id` varchar(255) NOT NULL,
  `point_transaction_point` int NOT NULL,
  `point_transaction_point_in_idr` decimal(10,2) NOT NULL,
  `point_transaction_product_name` varchar(255) NOT NULL,
  `point_transaction_product_price` decimal(10,2) NOT NULL,
  `point_transaction_store_name` varchar(255) NOT NULL,
  `point_transaction_type` enum('earn','redeem') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `point_transactions`
--

INSERT INTO `point_transactions` (`created_at`, `updated_at`, `deleted_at`, `deleted`, `point_transaction_id`, `point_transaction_user_id`, `point_transaction_membership_id`, `point_transaction_point`, `point_transaction_point_in_idr`, `point_transaction_product_name`, `point_transaction_product_price`, `point_transaction_store_name`, `point_transaction_type`) VALUES
('2026-03-12 14:22:30', '2026-03-12 14:22:30', NULL, 0, 3, 1, '1', 100, 10000.00, 'Product A', 50000.00, 'Store XYZ', 'earn'),
('2026-03-12 14:23:59', '2026-03-12 14:23:59', NULL, 0, 4, 1, '1', -100, -10000.00, 'Product A', 50000.00, 'Store XYZ', 'redeem'),
('2026-03-12 14:37:13', '2026-03-12 14:37:13', NULL, 0, 5, 1, '1', 10000, 1000000.00, 'Product A', 10000.00, 'Store XYZ', 'earn'),
('2026-03-12 14:37:32', '2026-03-12 14:37:32', NULL, 0, 6, 1, '1', 15000, 1500000.00, 'Product A', 10000.00, 'Store XYZ', 'earn'),
('2026-03-12 14:38:25', '2026-03-12 14:38:25', NULL, 0, 7, 1, '1', 15400, 1540000.00, 'Product A', 10000.00, 'Store XYZ', 'earn'),
('2026-03-12 14:38:25', '2026-03-12 14:38:25', NULL, 0, 8, 1, '1', 15400, 1540000.00, 'Product A', 10000.00, 'Store XYZ', 'earn');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('0-usersMigration.js'),
('1-storeMigration.js'),
('2-membershipMigration.js'),
('3-pointTransactionMigration.js'),
('4-bannerMigration.js'),
('5-pointConvertionMigration.js');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `store_id` int NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `store_location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`created_at`, `updated_at`, `deleted_at`, `deleted`, `store_id`, `store_name`, `store_location`) VALUES
('2026-03-11 22:00:27', '2026-03-11 22:06:36', NULL, 1, 1, 'New store', 'My first store'),
('2026-03-11 22:01:48', '2026-03-11 22:09:38', NULL, 1, 2, 'New store 1', 'My first store'),
('2026-03-11 22:04:52', '2026-03-11 22:10:09', NULL, 1, 3, 'sotesss', 'dsadasdas'),
('2026-03-11 22:10:00', '2026-03-11 22:10:00', NULL, 0, 4, 'storesd', 'adasds'),
('2026-03-11 23:42:45', '2026-03-11 23:42:45', NULL, 0, 5, 'store 2', 'Jl, sdsd');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  `user_name` varchar(128) NOT NULL,
  `user_password` varchar(128) NOT NULL,
  `user_whatsapp_number` varchar(128) NOT NULL,
  `user_role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`created_at`, `updated_at`, `deleted_at`, `deleted`, `user_id`, `user_name`, `user_password`, `user_whatsapp_number`, `user_role`) VALUES
('2026-03-12 11:07:51', '2026-03-12 11:07:51', NULL, 0, 1, 'John Doe', '6c18398bb71db30c63a90b5b3ff1aba06e3477f2', '6281234567890', 'user'),
('2026-03-12 15:19:31', '2026-03-12 15:19:31', NULL, 0, 2, 'Jack', 'b0e2cb911385fddddaa90f4733dafd347b86d9d5', '628123456789', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`membership_id`);

--
-- Indexes for table `point_convertions`
--
ALTER TABLE `point_convertions`
  ADD PRIMARY KEY (`point_convertion_id`);

--
-- Indexes for table `point_transactions`
--
ALTER TABLE `point_transactions`
  ADD PRIMARY KEY (`point_transaction_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_whatsapp_number` (`user_whatsapp_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `banner_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `memberships`
--
ALTER TABLE `memberships`
  MODIFY `membership_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `point_convertions`
--
ALTER TABLE `point_convertions`
  MODIFY `point_convertion_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `point_transactions`
--
ALTER TABLE `point_transactions`
  MODIFY `point_transaction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

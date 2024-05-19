-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: k10c208.p.ssafy.io    Database: nowdoboss
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `community_id` int unsigned NOT NULL COMMENT '커뮤니티 글 아이디',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '댓글 아이디',
  `member_id` int unsigned NOT NULL COMMENT '작성자 아이디',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '댓글 내용',
  PRIMARY KEY (`id`),
  KEY `FKbwy7a8hwdjqbm26qadw82ikqg` (`community_id`),
  KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
  CONSTRAINT `FKbwy7a8hwdjqbm26qadw82ikqg` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,'2024-05-14 11:23:43',1,12,'2024-05-14 11:23:43','잘될까요?'),(2,'2024-05-16 18:09:08',2,13,'2024-05-16 18:09:08','오뎅 맛있겠네요'),(5,'2024-05-18 12:20:27',6,18,'2024-05-18 12:33:55','요즘 밈 잘 아시네요 ㅎㅎ 저도 마라탕후루 야무지게 먹고싶네요 ㅎㅎ 마라탕후루 게즈아@@@@@@@@@@@@~~~~~~~~!!!!!!!!!!!@@@@@@@@@@@@@@@쏴리질럿@@@@'),(6,'2024-05-19 03:21:51',7,15,'2024-05-19 03:21:51','아마두~~');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:43:29

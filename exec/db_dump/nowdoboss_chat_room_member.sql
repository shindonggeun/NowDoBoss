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
-- Table structure for table `chat_room_member`
--

DROP TABLE IF EXISTS `chat_room_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room_member` (
  `chat_room_id` int unsigned NOT NULL COMMENT '채팅방 아이디',
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '채팅방 구성 아이디',
  `member_id` int unsigned NOT NULL COMMENT '구성원 아이디',
  PRIMARY KEY (`id`),
  KEY `FKo6a9v51aal2574fjb1ldlw4di` (`chat_room_id`),
  KEY `FKq64atn9y4cyjpp4qcrllxi3o5` (`member_id`),
  CONSTRAINT `FKo6a9v51aal2574fjb1ldlw4di` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
  CONSTRAINT `FKq64atn9y4cyjpp4qcrllxi3o5` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room_member`
--

LOCK TABLES `chat_room_member` WRITE;
/*!40000 ALTER TABLE `chat_room_member` DISABLE KEYS */;
INSERT INTO `chat_room_member` VALUES (1,1,2),(1,2,5),(1,3,1),(2,4,5),(1,5,8),(2,7,3),(1,8,4),(2,9,15),(2,10,2),(1,12,16),(3,13,5),(4,14,4),(2,15,16),(5,16,5),(3,17,16),(5,19,18),(5,20,4),(5,22,12),(1,23,3),(5,24,16),(5,25,15),(4,26,3),(4,27,15),(3,28,15),(1,29,15),(1,35,13),(5,43,8),(1,45,18),(3,49,18),(1,50,25),(3,51,25),(9,52,4),(9,54,3),(5,55,3),(9,57,18);
/*!40000 ALTER TABLE `chat_room_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:45:41

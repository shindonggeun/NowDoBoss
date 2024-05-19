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
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `read_count` int unsigned NOT NULL COMMENT '조회수',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '커뮤니티 아이디',
  `member_id` int unsigned NOT NULL COMMENT '작성자 아이디',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '커뮤니티 글 내용',
  `title` varchar(65) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '제목',
  `category` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '카테고리',
  PRIMARY KEY (`id`),
  KEY `FKhcwt9ggjfvanatb6u621vbf1r` (`member_id`),
  CONSTRAINT `FKhcwt9ggjfvanatb6u621vbf1r` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES (26,'2024-05-14 10:26:49',1,5,'2024-05-18 12:26:10','강동구 중 어느 쪽이 상권이 좋은가요?\n강동구청쪽 어떤가요?','상권 선택 고민입니다..','COMMERCIAL_AREA'),(99,'2024-05-14 10:28:05',2,5,'2024-05-19 10:39:14','지역은 강동 송파 보고있습니다 ㅎㅎ ','오뎅바 동업자 구해요~~','PARTNERSHIP'),(16,'2024-05-17 07:03:12',5,13,'2024-05-19 12:44:59','마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 마라탕후루 마라탕떡볶이 ','요즘에 핫한 메뉴가 추천해주세요!','ETC'),(6,'2024-05-18 12:28:49',6,18,'2024-05-19 10:31:36','삼전 가즈아@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@','삼성전자 주식 오를까요?','ETC'),(2,'2024-05-19 10:32:18',7,4,'2024-05-19 12:44:47','어디죠 그곳이?','좋은 상권 있나요?','COMMERCIAL_AREA'),(10,'2024-05-19 10:32:49',8,4,'2024-05-19 10:35:09','선착순 1명','샤브샤브 동업하실 분?','ETC'),(2,'2024-05-19 10:35:24',9,3,'2024-05-19 10:35:32','ㅁㄴㅇㅁㄴㅇ','ㅁㄴㅇㄴㅇ','ETC');
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:45:49

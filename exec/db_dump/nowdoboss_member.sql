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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜',
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '회원 아이디',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 날짜',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '이메일',
  `name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '이름',
  `nickname` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '닉네임',
  `password` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '비밀번호',
  `profile_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '프로필 이미지 URL',
  `provider` enum('KAKAO','NAVER','GOOGLE') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '소셜 로그인 제공업체',
  `role` enum('USER','ADMIN') CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '권한',
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('2024-05-11 08:14:18',1,'2024-05-11 08:14:18','test@test.com','신싸피','싸피짱짱','$2a$10$Lj.zE2ZiuvQhRVtLHXc2JOMZTTNOX1IHUTRD1jxUb9ftTCToSYy.6',NULL,NULL,'USER'),('2024-05-11 08:14:53',2,'2024-05-15 04:28:31','tlsehdrms@ssafy.com','신동근','동근짱','$2a$10$IRZZFGDLfoIjUV4uDxKRquJ9Fv3LVDtIIzuXudEqRic42ueCWq20a','https://storage.googleapis.com/nowdoboss.appspot.com/cute.jpg',NULL,'USER'),('2024-05-11 08:15:28',3,'2024-05-17 07:00:48','rlarhkddus@ssafy.com','김광연','광연짱','$2a$10$RB.AsYKlVYE7hVJ.cpwz3.JSV9lwlsIs5LuNz4inCop7.OkFxGkXK','https://storage.googleapis.com/nowdoboss.appspot.com/2_pro_2024_03_31.jpg',NULL,'USER'),('2024-05-11 08:16:00',4,'2024-05-19 10:46:22','qkrwjddls@ssafy.com','박정인','박정인','$2a$10$Iul8.JUyzfnyvFUfnmtTcee8boft5qaRWysUSy7rhXiPRsVGcTuUa','/images/profile.png',NULL,'USER'),('2024-05-11 08:16:23',5,'2024-05-11 08:16:23','chltjdgh@ssafy.com','최성호','성호짱','$2a$10$hWGH4kjg1V9wScqAd1wqdOnp.JcaloOaYO5hjrFTUod9MVilxZmhG',NULL,NULL,'USER'),('2024-05-11 08:16:44',6,'2024-05-11 08:16:44','rladhsdb@ssafy.com','김온유','온유짱','$2a$10$CnQKjYo.6gca1Q9ArnxD0uvX8YGIoNxJTSnxH.pjikI5tsOIyEkiO',NULL,NULL,'USER'),('2024-05-11 08:17:02',7,'2024-05-11 08:17:02','dltmdgus@ssafy.com','이승현','승현짱','$2a$10$W9a98DXStbLg3OgdAkzkT.jGbebZxyY5V2jKWgRxH.KnEsoENfT0G',NULL,NULL,'USER'),('2024-05-12 22:54:56',8,'2024-05-12 22:54:56','donggeun3484@gmail.com','신동근[광주_2반_C208]','신동근[광주_2반_C208]',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJOpe7AF-3-4wy4XmnjWW4WkVqcrkMLc9O2TxazcnOKI-1ESA=s96-c','GOOGLE','USER'),('2024-05-12 23:26:06',9,'2024-05-12 23:26:06','tlsehdrms3484@nate.com','신동근','신동근',NULL,'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640','KAKAO','USER'),('2024-05-13 02:42:55',12,'2024-05-13 02:42:55','tmdgus1761@gmail.com','이승현[광주_2반_C208]','이승현[광주_2반_C208]',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJtpnjKrP722QnO-kuxQYHaA1SqrcGWISVaaWCLfhF8NbQKuVuk=s96-c','GOOGLE','USER'),('2024-05-13 09:23:35',13,'2024-05-17 07:10:05','gkc04075@gmail.com','김온유','오뉴',NULL,'https://storage.googleapis.com/nowdoboss.appspot.com/짱구 말풍선 짤.jfif','GOOGLE','USER'),('2024-05-14 11:27:27',14,'2024-05-14 11:27:27','tmdgus1751@nate.com','이승현','이승현',NULL,'http://k.kakaocdn.net/dn/dBHZ38/btrGy7LtO0o/k3LY9CH8eINAECMV04jhek/img_640x640.jpg','KAKAO','USER'),('2024-05-14 18:28:50',15,'2024-05-14 18:28:50','chltjdgh3@naver.com','최성호','최성호',NULL,'http://k.kakaocdn.net/dn/cjeUUP/btsFqYgHsbk/uTKjR1g5UPO7iuLxbyoSRK/img_640x640.jpg','KAKAO','USER'),('2024-05-16 09:46:57',16,'2024-05-16 09:46:57','son9aram@gmail.com','송아람','아람',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJj8fm2kOg68szZB5IbT-XRBf2vntyG7iOwyNAaQMdmKKF-ZdE=s96-c','GOOGLE','USER'),('2024-05-16 15:06:39',17,'2024-05-16 15:06:39','worldbest9705@naver.com','김광연','김광연',NULL,'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640','KAKAO','USER'),('2024-05-16 15:53:07',18,'2024-05-16 15:53:07','tlsehdrms124@naver.com','신동근','동긔',NULL,'https://ssl.pstatic.net/static/pwe/address/img_profile.png','NAVER','USER'),('2024-05-17 06:00:10',19,'2024-05-17 06:00:10','kwang9705@gmail.com','김광연','광연',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLLPqdQlZEC0BPMEqKVvTcqNaGwBvAck-JGZwLMlJmaBKdJcQ=s96-c','GOOGLE','USER'),('2024-05-17 06:20:49',20,'2024-05-17 06:20:49','tlsehdrms348@naver.com','신동근','동긔','$2a$10$yHmRtigZFRY7TOpqiwMU1uQq2aQD/IwuIkOg0gtRF5t2BezCBt/YC',NULL,NULL,'USER'),('2024-05-18 09:12:01',24,'2024-05-18 09:12:01','kwang9705@naver.com','김사또','엣헴','$2a$10$cZMzZzSVeC5KcKMN0AlM6Ov5Jo.qxB8VctsBg5GaZ1aVPDomNcfkC','',NULL,'USER'),('2024-05-19 10:29:34',25,'2024-05-19 10:29:34','sirika2547@gmail.com','김재훈','재훈',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJd1jGgmdKb9NJGQKPVDAyv2baYaeKLxwZytWLg2r1cU1FrqrRf=s96-c','GOOGLE','USER');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:38:19

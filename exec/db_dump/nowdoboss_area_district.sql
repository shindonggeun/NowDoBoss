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
-- Table structure for table `area_district`
--

DROP TABLE IF EXISTS `area_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area_district` (
  `x` float NOT NULL COMMENT 'x 좌표 값',
  `y` float NOT NULL COMMENT 'y 좌표 값',
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '영역 자치구 아이디',
  `district_code` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드',
  `district_code_name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '자치구 코드 명',
  PRIMARY KEY (`id`),
  KEY `idx_district_code` (`district_code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_district`
--

LOCK TABLES `area_district` WRITE;
/*!40000 ALTER TABLE `area_district` DISABLE KEYS */;
INSERT INTO `area_district` VALUES (197997,455039,1,'11110','종로구'),(199639,451178,2,'11140','중구'),(198224,447985,3,'11170','용산구'),(203628,450168,4,'11200','성동구'),(207577,449693,5,'11215','광진구'),(204847,453608,6,'11230','동대문구'),(208203,455365,7,'11260','중랑구'),(201547,456236,8,'11290','성북구'),(200988,460427,9,'11305','강북구'),(202857,463273,10,'11320','도봉구'),(206623,461433,11,'11350','노원구'),(193557,457737,12,'11380','은평구'),(194617,453140,13,'11410','서대문구'),(191895,451092,14,'11440','마포구'),(187215,447260,15,'11470','양천구'),(184345,451315,16,'11500','강서구'),(187294,443893,17,'11530','구로구'),(191226,440133,18,'11545','금천구'),(192060,446984,19,'11560','영등포구'),(195725,444381,20,'11590','동작구'),(195164,440885,21,'11620','관악구'),(202764,441541,22,'11650','서초구'),(205569,444135,23,'11680','강남구'),(210194,445134,24,'11710','송파구'),(212991,450114,25,'11740','강동구');
/*!40000 ALTER TABLE `area_district` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:43:00

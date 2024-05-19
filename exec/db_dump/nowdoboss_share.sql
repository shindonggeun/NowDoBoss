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
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share` (
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL COMMENT '토큰',
  `url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '입력화면 url',
  `input` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL COMMENT '입력 데이터',
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES ('13389ed9-daea-42f5-b149-46b3650d2675','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"점프셈교실(공부방)\",\"gugun\":\"성동구\",\"serviceCode\":\"CS200001\",\"serviceCodeName\":\"일반교습학원\",\"storeSize\":198,\"floor\":\"1층이외\"}'),('1bdb84d6-41b8-47ef-aab5-577c8572fb33','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"비와별 닭갈비\",\"gugun\":\"성동구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":65,\"floor\":\"1층\"}'),('1f8619b8-9327-41ed-8642-9eaa0d1b4618','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"비와별 닭갈비\",\"gugun\":\"중구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":36,\"floor\":\"1층\"}'),('39d4336f-4c02-45c4-ab25-6d54c0bd60a6','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"롱쓰부대찌개\",\"gugun\":\"도봉구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":94,\"floor\":\"1층\"}'),('4eaf6130-7d82-4a05-8746-9cd0f7ee5908','http://localhost:5173/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"4242샌드위치\",\"gugun\":\"송파구\",\"serviceCode\":\"CS100004\",\"serviceCodeName\":\"양식음식점\",\"storeSize\":96,\"floor\":\"1층\"}'),('669c7862-907f-4b49-ab20-c2cfa7e1bf06','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"롱쓰부대찌개\",\"gugun\":\"도봉구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":94,\"floor\":\"1층\"}'),('6d082c3b-2e7a-412c-8259-6dbdf0ca3e26','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"비와별 닭갈비\",\"gugun\":\"성동구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":65,\"floor\":\"1층\"}'),('6e7d9ec8-2b81-4132-b790-b75c4ff2a77a','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"롱쓰부대찌개\",\"gugun\":\"도봉구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":94,\"floor\":\"1층\"}'),('77ea388f-04a9-4d47-a67a-18ccc96c6a73','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":false,\"brandName\":null,\"gugun\":\"강남구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":36,\"floor\":\"1층\"}'),('863e9c4d-6fab-49a9-a72c-b04549bfd949','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"롱쓰부대찌개\",\"gugun\":\"도봉구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":94,\"floor\":\"1층\"}'),('8ffec0ac-c237-40f6-930f-5c3b942bc55e','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"롱쓰부대찌개\",\"gugun\":\"도봉구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":94,\"floor\":\"1층\"}'),('aaa0a8d4-65fb-43c5-a6f0-6ec13894983e','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"내차를부탁해\",\"gugun\":\"성동구\",\"serviceCode\":\"CS200025\",\"serviceCodeName\":\"자동차수리\",\"storeSize\":165,\"floor\":\"1층이외\"}'),('d6744c0f-1b3e-4c5b-b39e-829c5adbed57','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"롱쓰부대찌개\",\"gugun\":\"도봉구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":94,\"floor\":\"1층\"}'),('e43deb59-d35d-4b05-9550-c7228fded0f1','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"내차를부탁해\",\"gugun\":\"성동구\",\"serviceCode\":\"CS200025\",\"serviceCodeName\":\"자동차수리\",\"storeSize\":165,\"floor\":\"1층이외\"}'),('e75b9fe9-a163-4a47-a1c5-56700e9938ff','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"비와별 닭갈비\",\"gugun\":\"중구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":36,\"floor\":\"1층\"}'),('f300b6fa-970b-4633-a300-46c4618f9da2','https://k10c208.p.ssafy.io/api/v1/analysis/simulation/report','{\"isFranchisee\":true,\"brandName\":\"무국적식탁\",\"gugun\":\"중구\",\"serviceCode\":\"CS100001\",\"serviceCodeName\":\"한식음식점\",\"storeSize\":36,\"floor\":\"1층\"}');
/*!40000 ALTER TABLE `share` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 21:45:46

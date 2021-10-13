-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: diplom
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business` (
  `_id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `business_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES ('3e993b0f-3b49-4360-b812-cf25f557d7e5','2fd8a41e-877b-41d8-9466-74db4cea2570'),('b4fdac68-9891-4f38-8fc7-6a7e90ce1735','6c298ee2-07e5-48ca-81af-84b41836e725'),('04aeeec3-abcd-46e5-b698-6851dffe4b52','bf010189-2e20-419c-9409-5534fcf7f0e1'),('10e54b7c-6847-42ec-a2fe-675c7d5d87a7','bf010189-2e20-419c-9409-5534fcf7f0e1'),('2411c919-157c-44ef-ae46-d97fd8c2ce1d','bf010189-2e20-419c-9409-5534fcf7f0e1'),('3623f80b-a1c5-420e-896a-bbc84c86af51','bf010189-2e20-419c-9409-5534fcf7f0e1'),('699e8898-a380-4496-93f3-c45f809c85e9','bf010189-2e20-419c-9409-5534fcf7f0e1'),('92e817ec-5858-486f-8e08-7bc54debbb42','bf010189-2e20-419c-9409-5534fcf7f0e1'),('ce8d2afe-f3cf-439b-9190-f41a1d33e3d8','bf010189-2e20-419c-9409-5534fcf7f0e1'),('df8cee97-c012-4bd6-bcf5-3637d30238b9','bf010189-2e20-419c-9409-5534fcf7f0e1'),('feb86dce-b223-4580-a52e-23aff661be61','bf010189-2e20-419c-9409-5534fcf7f0e1');
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `_id` varchar(36) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('0','Franchise'),('1','Startup'),('2','Small business'),('3','Big business'),('4','We will do business, we will do money');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `_id` varchar(36) NOT NULL,
  `edition_id` varchar(36) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `text` varchar(256) DEFAULT NULL,
  `creation_date` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `edition_id` (`edition_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`edition_id`) REFERENCES `edition` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES ('14ff1896-ab12-46e9-b964-658a29f29e5b','e2724725-920f-4ac6-a430-dacd8d08a0dc','2fd8a41e-877b-41d8-9466-74db4cea2570','maksi krutoi','1632766954848'),('4c262953-65d5-4efc-aa52-6954acde2729','14ab0d60-5ba9-460e-b687-27c62c26da7a','bf010189-2e20-419c-9409-5534fcf7f0e1','test second','1633963352778'),('d65f693c-4a36-4e9f-88af-78108e09ef44','3a77b023-c636-4815-83fa-f2184d978494','bf010189-2e20-419c-9409-5534fcf7f0e1','test first','1633963111100'),('d9b0ea8a-fd0a-43aa-8f27-a7301609c5bf','14ab0d60-5ba9-460e-b687-27c62c26da7a','bf010189-2e20-419c-9409-5534fcf7f0e1','test first','1633962936480'),('f6ae5f8e-c033-46fb-8b70-cb5b406b6ae0','3a77b023-c636-4815-83fa-f2184d978494','bf010189-2e20-419c-9409-5534fcf7f0e1','test second','1633963199235');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dislikes`
--

DROP TABLE IF EXISTS `dislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dislikes` (
  `_id` varchar(36) NOT NULL,
  `edition_id` varchar(36) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `edition_id` (`edition_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `dislikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`),
  CONSTRAINT `dislikes_ibfk_3` FOREIGN KEY (`edition_id`) REFERENCES `edition` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dislikes`
--

LOCK TABLES `dislikes` WRITE;
/*!40000 ALTER TABLE `dislikes` DISABLE KEYS */;
INSERT INTO `dislikes` VALUES ('224c2255-9472-44c1-8f91-e6859a5686ae','e2724725-920f-4ac6-a430-dacd8d08a0dc','bf010189-2e20-419c-9409-5534fcf7f0e1');
/*!40000 ALTER TABLE `dislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edition`
--

DROP TABLE IF EXISTS `edition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edition` (
  `_id` varchar(36) NOT NULL,
  `business_id` varchar(36) DEFAULT NULL,
  `category_id` varchar(36) DEFAULT NULL,
  `type_id` varchar(36) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `creation_date` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `business_id` (`business_id`),
  KEY `category_id` (`category_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `edition_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`_id`),
  CONSTRAINT `edition_ibfk_3` FOREIGN KEY (`type_id`) REFERENCES `type` (`_id`),
  CONSTRAINT `edition_ibfk_4` FOREIGN KEY (`business_id`) REFERENCES `business` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edition`
--

LOCK TABLES `edition` WRITE;
/*!40000 ALTER TABLE `edition` DISABLE KEYS */;
INSERT INTO `edition` VALUES ('0176fbbc-176a-4770-92fa-8bd63204d199','ce8d2afe-f3cf-439b-9190-f41a1d33e3d8','3','0','after refactor','test edsc','1633962563287'),('1178797d-1379-4648-90e3-e46b27f7e538','10e54b7c-6847-42ec-a2fe-675c7d5d87a7','0','0','asd 3','','1632756789787'),('14ab0d60-5ba9-460e-b687-27c62c26da7a','3e993b0f-3b49-4360-b812-cf25f557d7e5','0','1','maksi s plan v2','','1632766974815'),('1b7dbcdb-52cd-4171-a0f8-ba0c41025dc0','b4fdac68-9891-4f38-8fc7-6a7e90ce1735','0','0','a','','1632764746862'),('25b0c3be-655d-4003-a10b-9b0003bc109e','699e8898-a380-4496-93f3-c45f809c85e9','0','0','new','','1632757023188'),('3a77b023-c636-4815-83fa-f2184d978494','df8cee97-c012-4bd6-bcf5-3637d30238b9','0','0','new plan v 12','sadfsfdsf','1632944814064'),('3c207174-bed9-47d8-bb91-f09bdfd45606','10e54b7c-6847-42ec-a2fe-675c7d5d87a7','0','0','asd 3','bob','1633956419972'),('4da5726d-e7c2-4e67-a94f-a70bb93fa988','92e817ec-5858-486f-8e08-7bc54debbb42','0','0','╨╣╤Ж╤Г','123','1632931210963'),('6164afc4-b6e8-4fcc-8ad8-57b48658ab6d','3623f80b-a1c5-420e-896a-bbc84c86af51','0','0','new','','1632756803644'),('6d20fcf5-af40-4897-aaac-8e3703e89839','feb86dce-b223-4580-a52e-23aff661be61','1','1','test math system','new plan for Maryana ()','1632870996333'),('c37a0677-87d2-402c-a44d-c7626f09a64f','04aeeec3-abcd-46e5-b698-6851dffe4b52','0','0','safsdgdfg','','1632757055943'),('cc1f631c-7435-404c-924b-5f824f591cde','ce8d2afe-f3cf-439b-9190-f41a1d33e3d8','3','0','after refactor','test description','1633962818006'),('e2724725-920f-4ac6-a430-dacd8d08a0dc','3e993b0f-3b49-4360-b812-cf25f557d7e5','0','1','maksi s plan','','1632766911813'),('e4cb2119-7e2b-4a13-b1e6-dc784f3ae8d4','10e54b7c-6847-42ec-a2fe-675c7d5d87a7','0','0','asd','','1632756750008'),('e8f8c21a-a471-42fd-947b-a657752ae81d','2411c919-157c-44ef-ae46-d97fd8c2ce1d','0','0','for design','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...','1632865786761'),('ee86b02f-fc8b-4ed7-9ed4-2f39547cf513','699e8898-a380-4496-93f3-c45f809c85e9','0','1','new 123','','1632757071163'),('fd0ec932-4d0b-44a1-97e1-7105276caf9f','10e54b7c-6847-42ec-a2fe-675c7d5d87a7','0','0','asd','','1632756765799');
/*!40000 ALTER TABLE `edition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expence`
--

DROP TABLE IF EXISTS `expence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expence` (
  `_id` varchar(36) NOT NULL,
  `edition_id` varchar(36) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `electricity` int DEFAULT NULL,
  `amortization` int DEFAULT NULL,
  `materials` int DEFAULT NULL,
  `maintenance` int DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `edition_id` (`edition_id`),
  CONSTRAINT `expence_ibfk_1` FOREIGN KEY (`edition_id`) REFERENCES `edition` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expence`
--

LOCK TABLES `expence` WRITE;
/*!40000 ALTER TABLE `expence` DISABLE KEYS */;
INSERT INTO `expence` VALUES ('2352b66a-2356-4102-ac5f-36c3af508f56','e4cb2119-7e2b-4a13-b1e6-dc784f3ae8d4',1,1,1,1,1,''),('28d13315-aaeb-44c7-86f3-951112bfbc45','c37a0677-87d2-402c-a44d-c7626f09a64f',1,2,2,3,4,''),('2f87f2c0-a417-4d86-9566-3b368fe1f25a','4da5726d-e7c2-4e67-a94f-a70bb93fa988',13,123,213,123,123,''),('553c5f3a-6f3c-4945-b6df-a30813d25b7c','e8f8c21a-a471-42fd-947b-a657752ae81d',123,123,213,123,123,''),('5bec0031-aea7-4b78-9d44-fdfaaf8ae5a3','1178797d-1379-4648-90e3-e46b27f7e538',1,1,1,1,1,''),('5c69cb29-3937-4b22-a987-57c85e11a6f8','cc1f631c-7435-404c-924b-5f824f591cde',1,1,11,1,1,'asd'),('6b4a3705-06b2-4d36-90c3-6465ac4a2b3f','3c207174-bed9-47d8-bb91-f09bdfd45606',1,1,1,1,1,''),('745f6f79-2c30-468d-9291-37401e2f79c1','0176fbbc-176a-4770-92fa-8bd63204d199',1,1,11,1,1,'asd'),('7ba2eac6-c160-423b-a401-feab5bde4891','3a77b023-c636-4815-83fa-f2184d978494',12,21,21,21,12,''),('8ca9e604-f841-4752-8d53-0ae91da9f75c','e2724725-920f-4ac6-a430-dacd8d08a0dc',1,1,1,1,1,''),('9604aaa4-7ffb-47bc-a87b-cea9608c8758','6d20fcf5-af40-4897-aaac-8e3703e89839',12,4,100,100,2,''),('b0e121bb-592e-4b6f-abe0-71fe6a161da8','1b7dbcdb-52cd-4171-a0f8-ba0c41025dc0',1,1,1,1,1,''),('d1fd45ba-e86d-4211-b110-765557f6a1b2','14ab0d60-5ba9-460e-b687-27c62c26da7a',2,1,1,1,1,''),('de559f40-2fc9-4e14-8d6c-01a384d80e7f','fd0ec932-4d0b-44a1-97e1-7105276caf9f',1,1,1,1,1,''),('e7095289-9122-44af-89d1-131a99c6411b','25b0c3be-655d-4003-a10b-9b0003bc109e',1,1,1,1,1,''),('fa034528-060e-4bfa-9fb0-19acb0b98d9a','ee86b02f-fc8b-4ed7-9ed4-2f39547cf513',1,1,1,1,1,''),('fd3ea846-d3cd-4463-97df-d8e7bf9e0a21','6164afc4-b6e8-4fcc-8ad8-57b48658ab6d',12,12,12,12,12,'');
/*!40000 ALTER TABLE `expence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income`
--

DROP TABLE IF EXISTS `income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income` (
  `_id` varchar(36) NOT NULL,
  `edition_id` varchar(36) DEFAULT NULL,
  `profit` int DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `edition_id` (`edition_id`),
  CONSTRAINT `income_ibfk_1` FOREIGN KEY (`edition_id`) REFERENCES `edition` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income`
--

LOCK TABLES `income` WRITE;
/*!40000 ALTER TABLE `income` DISABLE KEYS */;
INSERT INTO `income` VALUES ('06dd04dc-8457-42ec-8e67-e0b043378099','e4cb2119-7e2b-4a13-b1e6-dc784f3ae8d4',3,''),('0bba61ab-163e-4ce2-8917-3450ea2a6919','6d20fcf5-af40-4897-aaac-8e3703e89839',42,''),('2e426e61-e2b6-43dd-ae78-0d4e1ea9e9ca','25b0c3be-655d-4003-a10b-9b0003bc109e',2,''),('35586551-7462-4835-932a-aa33cc7f7381','3c207174-bed9-47d8-bb91-f09bdfd45606',4,''),('6b36b4fb-6138-410c-ad6f-2eeac51b9502','cc1f631c-7435-404c-924b-5f824f591cde',12,'asd'),('6e21beea-5b18-44b4-b908-84f81048c737','fd0ec932-4d0b-44a1-97e1-7105276caf9f',4,''),('6ef5a08e-ccbc-45f5-b43d-31871b73aa89','14ab0d60-5ba9-460e-b687-27c62c26da7a',5,''),('7bbdaf90-edce-4486-9b7d-0469fc063f21','1178797d-1379-4648-90e3-e46b27f7e538',4,''),('87d09ed7-fcfc-4a0a-b471-034940ad4e42','6164afc4-b6e8-4fcc-8ad8-57b48658ab6d',3,''),('9c397589-9175-479e-bf0a-a6fdc4e81a5c','e2724725-920f-4ac6-a430-dacd8d08a0dc',2,''),('9f811c98-8a5c-4e8c-9e99-268597ed6e1b','0176fbbc-176a-4770-92fa-8bd63204d199',12,'asd'),('b5cce23c-dc8d-4908-a986-17d67e6a0691','c37a0677-87d2-402c-a44d-c7626f09a64f',12,''),('c94a1119-be5b-4d1c-8cd4-51902b0c098f','1b7dbcdb-52cd-4171-a0f8-ba0c41025dc0',1,''),('df4fa22b-9eec-4d06-afa9-846c8976cf17','3a77b023-c636-4815-83fa-f2184d978494',23,''),('df8e61e1-48fc-42ac-b184-2600ab4378be','e8f8c21a-a471-42fd-947b-a657752ae81d',1,''),('f0224d48-b99a-4095-83e1-2e1eeb8ac416','4da5726d-e7c2-4e67-a94f-a70bb93fa988',123,''),('f7295b5e-a655-40fd-b53e-01ce6c3fe963','ee86b02f-fc8b-4ed7-9ed4-2f39547cf513',2,'');
/*!40000 ALTER TABLE `income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `_id` varchar(36) NOT NULL,
  `edition_id` varchar(36) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `edition_id` (`edition_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`),
  CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`edition_id`) REFERENCES `edition` (`_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('a6fc7f65-3cb7-468c-89bd-1ae61b3bc8fe','14ab0d60-5ba9-460e-b687-27c62c26da7a','bf010189-2e20-419c-9409-5534fcf7f0e1'),('cad745b7-aac4-4eb4-a5d4-99e8b6f2d3ab','e8f8c21a-a471-42fd-947b-a657752ae81d','bf010189-2e20-419c-9409-5534fcf7f0e1');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `body` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `death_date` varchar(32) DEFAULT NULL,
  `ip` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`body`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('4606bca4-b8ab-4bda-8bcc-408f6a96888c','c6aa4b0e-6ff8-4d59-8fc5-db66f95f8b49','1634081065557','::ffff:127.0.0.1'),('c9395f8a-9225-4ad2-957c-0955b849db0e','2fd8a41e-877b-41d8-9466-74db4cea2570','1632767581794','::ffff:127.0.0.1'),('d2683608-d895-4277-8ec0-7a8ab29ec700','6c298ee2-07e5-48ca-81af-84b41836e725','1632765016051','::ffff:127.0.0.1');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `_id` varchar(36) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('0','Food'),('1','IT');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `_id` varchar(36) NOT NULL,
  `login` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `photo_path` varchar(64) DEFAULT NULL,
  `nickname` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2fd8a41e-877b-41d8-9466-74db4cea2570','maksim','123',NULL,'maksi'),('6c298ee2-07e5-48ca-81af-84b41836e725','maryana','maryana',NULL,'maryana'),('bf010189-2e20-419c-9409-5534fcf7f0e1','test','test',NULL,'test'),('c6aa4b0e-6ff8-4d59-8fc5-db66f95f8b49','root','root',NULL,'admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-13  2:24:53

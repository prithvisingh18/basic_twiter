CREATE DATABASE  IF NOT EXISTS `postman_test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `postman_test`;
-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: postman_test
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follow` (
  `followed` varchar(100) NOT NULL,
  `follower` varchar(100) NOT NULL,
  `operation_id` varchar(100) NOT NULL,
  PRIMARY KEY (`operation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('test2','test','7d629815-d12f-57b7-a03e-1b390919390a'),('test','test','9ed25538-63b3-5746-8272-f3a0bdef7af0');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `tweet_op_id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retweet`
--

DROP TABLE IF EXISTS `retweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `retweet` (
  `tweet_op_id` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tweet_op_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retweet`
--

LOCK TABLES `retweet` WRITE;
/*!40000 ALTER TABLE `retweet` DISABLE KEYS */;
INSERT INTO `retweet` VALUES ('1184a2a0-2433-5644-9260-f19c857fd35d','test');
/*!40000 ALTER TABLE `retweet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweets`
--

DROP TABLE IF EXISTS `tweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tweets` (
  `operation_id` varchar(100) NOT NULL,
  `tweet` varchar(250) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`operation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES ('1184a2a0-2433-5644-9260-f19c857fd35d','Hello_test','test2'),('119fb5ed-4def-5969-b0c6-235cdb9e67fe','test_1234','test'),('25ba248f-667d-57e1-9dc6-619de4e84cf9','Hello','test'),('7cf77eb4-bfe9-5b11-b369-9862734098bc','test_1234','test'),('84dc9bd2-abaa-579f-b3fb-f9ffad8658ce','Hello','test'),('a83cb274-71ba-5a0d-af81-7e4696730043','test_1234','test'),('aa4b2c62-d2ee-57b4-b658-7ce616479704','test_1234','test'),('b62c5d7b-b0a6-5182-85a9-f1cd10f116b0','test_1234','test'),('c0cc1d85-291b-5155-b679-83b07e6b7326','test_1234','test'),('cc7df51a-7cbd-5f73-ad1b-3b44812f86f0','test_1234','test'),('fa27d594-8ac6-51ae-83be-334c6eb87009','Hello','test'),('fed84cd2-dfe4-5312-b507-8e27d50e9f21','test_1234','test');
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('test','$2b$10$V82nt2INgkpDfRxQw5kGVO/Eo.XnjAuXdfH64Q1Iqjmy8fziofiqe'),('test2','$2b$10$y9zvNaxMnyx.HqSc1Z/OLux5vk2C/.IQJDsj97.fbO7GNiQ1QEM0.'),('test_1','$2b$10$45a7RvJ5EqN/wdr8yEjIsOf8mdpDiEPEq5WcaU13W4un87IxTgqka');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'postman_test'
--

--
-- Dumping routines for database 'postman_test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-08  1:33:52
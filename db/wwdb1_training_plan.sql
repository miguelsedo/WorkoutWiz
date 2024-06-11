-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wwdb1
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `training_plan`
--

DROP TABLE IF EXISTS `training_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_plan` (
  `persona_id` varchar(255) NOT NULL,
  `ejercicio_id` int DEFAULT NULL,
  `series` int DEFAULT NULL,
  `repeticiones` int DEFAULT NULL,
  `dia` int DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `resumen_dia` varchar(255) DEFAULT NULL,
  `ID` int NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `ejercicio` varchar(255) DEFAULT NULL,
  `exercise_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`exercise_id`),
  KEY `persona_id` (`persona_id`),
  KEY `ejercicio_id` (`ejercicio_id`),
  CONSTRAINT `training_plan_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`ID`),
  CONSTRAINT `training_plan_ibfk_2` FOREIGN KEY (`ejercicio_id`) REFERENCES `ejercicio` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=791 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_plan`
--

LOCK TABLES `training_plan` WRITE;
/*!40000 ALTER TABLE `training_plan` DISABLE KEYS */;
INSERT INTO `training_plan` VALUES ('y9R5eAuimWMOpTi0xiVQYWiQv1h2',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Tren Inferior',1,'5 series de 10 repeticiones','Sentadillas',606),('y9R5eAuimWMOpTi0xiVQYWiQv1h2',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Tren Inferior',1,'4 series de 15 repeticiones. Puedes realizarlas con el peso corporal o con una barra en los hombros para aumentar la intensidad.','Sentadillas',607),('y9R5eAuimWMOpTi0xiVQYWiQv1h2',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Tren Inferior',1,'3 series de 10 repeticiones','Peso muerto',608),('y9R5eAuimWMOpTi0xiVQYWiQv1h2',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Tren Superior',1,'4 series de 12 repeticiones','Elevaciones laterales con mancuernas',609),('y9R5eAuimWMOpTi0xiVQYWiQv1h2',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Tren Superior',1,'3 series de 15 repeticiones','Pulldown de tríceps',610),('y9R5eAuimWMOpTi0xiVQYWiQv1h2',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Tren Superior',1,'3 series de 10 repeticiones','Flexiones',611),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Entrenamiento de Tren Superior',2,'Press de banca, 3 series de 10 repeticiones','Ejercicio 1',682),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Entrenamiento de Tren Superior',2,'Jalones al pecho en polea, 3 series de 10 repeticiones','Ejercicio 2',683),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Entrenamiento de Tren Superior',2,'Elevaciones laterales con mancuernas, 3 series de 10 repeticiones','Ejercicio 3',684),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Entrenamiento de Tren Superior',2,'Curl de bíceps con barra, 3 series de 10 repeticiones','Ejercicio 4',685),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Entrenamiento de Tren Inferior y Abdominales',2,'Sentadillas, 3 series de 10 repeticiones','Ejercicio 1',686),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Entrenamiento de Tren Inferior y Abdominales',2,'Peso muerto, 3 series de 10 repeticiones','Ejercicio 2',687),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Entrenamiento de Tren Inferior y Abdominales',2,'Extensión de piernas en máquina, 3 series de 10 repeticiones','Ejercicio 3',688),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Entrenamiento de Tren Inferior y Abdominales',2,'Abdominales en máquina, 3 series de 15 repeticiones','Ejercicio 4',689),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Fullbody Workout',3,'4 series de 12 repeticiones','Sentadillas',690),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Fullbody Workout',3,'4 series de 10 repeticiones','Press de banca',691),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Fullbody Workout',3,'3 series de 8 repeticiones','Peso muerto',692),('Sbh3VtZhfhMBUyQIJVXhdqOQUyB2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Fullbody Workout',3,'3 series de 10 repeticiones','Pull-ups',693),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Fullbody',4,'3 series de 12 repeticiones','Sentadillas',726),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Fullbody',4,'3 series de 10 repeticiones','Press de banca',727),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Fullbody',4,'3 series de 12 repeticiones','Peso muerto',728),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Fullbody',4,'3 series de 8 repeticiones','Pull-ups',729),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Ganar músculo - 2 días','Día 1 Fullbody',4,'3 series de 30 segundos','Plancha',730),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Upper Body',4,'3 series de 10 repeticiones','Press militar',731),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Upper Body',4,'3 series de 8 repeticiones','Dominadas',732),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Upper Body',4,'3 series de 15 repeticiones','Flexiones de brazos',733),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Ganar músculo - 2 días','Día 2 Upper Body',4,'3 series de 12 repeticiones','Elevaciones laterales con mancuernas',734),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Fullbody',5,'3 series de 12 repeticiones.','Zancadas',735),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Fullbody',5,'3 series de 12 repeticiones','Press de banca',736),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Fullbody',5,'3 series de 12 repeticiones','Peso muerto',737),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Fullbody',5,'3 series de 10 repeticiones','Dominadas',738),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,1,'Perder Grasa - 2 días','Día 1 Fullbody',5,'3 series de 30 segundos','Plancha',739),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Upper Body',5,'3 series de 10 repeticiones','Press militar',740),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Upper Body',5,'3 series de 12 repeticiones','Remo con barra',741),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Upper Body',5,'3 series de 15 repeticiones','Flexiones',742),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Upper Body',5,'3 series de 12 repeticiones','Curl de bíceps',743),('kQGOzhcjsSerEYQIv82ckiV1Vy82',NULL,NULL,NULL,2,'Perder Grasa - 2 días','Día 2 Upper Body',5,'3 series de 12 repeticiones','Extensiones de tríceps',744),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 1 días','Día 1 Full Body Workout',6,'3 series de 12 repeticiones','Sentadillas',745),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 1 días','Día 1 Full Body Workout',6,'3 series de 10 repeticiones','Press de banca',746),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 1 días','Día 1 Full Body Workout',6,'3 series de 12 repeticiones','Peso muerto',747),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 1 días','Día 1 Full Body Workout',6,'3 series de 8 repeticiones','Dominadas',748),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 1 días','Día 1 Full Body Workout',6,'3 series de 12 repeticiones','Prensa de hombros',749),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Ganar músculo - Fullbody',7,'3 series de 12 repeticiones','Sentadillas',764),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Ganar músculo - Fullbody',7,'3 series de 10 repeticiones','Press de banca',765),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Ganar músculo - Fullbody',7,'3 series de 8 repeticiones','Pull-ups',766),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Ganar músculo - Fullbody',7,'3 series de 12 repeticiones','Peso muerto',767),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Ganar músculo - Fullbody',7,'3 series de 10 repeticiones','Curl de bíceps',768),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar músculo - 1 días','Día 1 Ganar músculo - Fullbody',7,'3 series de 12 repeticiones','Tríceps en polea',769),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 2 días','Día 1 Fullbody',8,'3 series de 12 repeticiones','Sentadillas',782),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 2 días','Día 1 Fullbody',8,'3 series de 10 repeticiones','Press de banca',783),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 2 días','Día 1 Fullbody',8,'3 series de 8 repeticiones','Dominadas',784),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 2 días','Día 1 Fullbody',8,'3 series de 12 repeticiones','Peso muerto',785),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,1,'Ganar resistencia - 2 días','Día 1 Fullbody',8,'3 series de 10 repeticiones','Fondos de tríceps',786),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,2,'Ganar resistencia - 2 días','Día 2 Entrenamiento de resistencia',8,'30 minutos','Correr en cinta',787),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,2,'Ganar resistencia - 2 días','Día 2 Entrenamiento de resistencia',8,'4 series de 500 metros','Remo en máquina',788),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,2,'Ganar resistencia - 2 días','Día 2 Entrenamiento de resistencia',8,'3 series de 1 minuto','Plancha',789),('OSDcI2OJtKUHlMPCwHytos9JENW2',NULL,NULL,NULL,2,'Ganar resistencia - 2 días','Día 2 Entrenamiento de resistencia',8,'3 series de 15 repeticiones','Peso muerto rumano',790);
/*!40000 ALTER TABLE `training_plan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-11 20:07:28

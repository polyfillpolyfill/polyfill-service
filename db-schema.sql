# ************************************************************
# Sequel Pro SQL dump
# Version 4749
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: f8ogy1hm9ubgfv2s.chr7pe7iynqr.eu-west-1.rds.amazonaws.com (MySQL 5.5.5-10.0.17-MariaDB-log)
# Database: k8gcbk22uwhj0bh7
# Generation Time: 2016-06-28 03:55:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table detect_results
# ------------------------------------------------------------

DROP TABLE IF EXISTS `detect_results`;

CREATE TABLE `detect_results` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `request_id` int(11) DEFAULT NULL,
  `feature_name` varchar(30) DEFAULT NULL,
  `result` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table requests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `req_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `perf_dns` float DEFAULT NULL,
  `perf_connect` float DEFAULT NULL,
  `perf_req` float DEFAULT NULL,
  `perf_resp` float DEFAULT NULL,
  `ua_family` varchar(30) DEFAULT NULL,
  `ua_version` varchar(10) DEFAULT '',
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `country` varchar(3) DEFAULT NULL,
  `data_center` char(4) DEFAULT '',
  `refer_domain` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

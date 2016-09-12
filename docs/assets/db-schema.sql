-- Create syntax for TABLE 'detect_results'
CREATE TABLE `detect_results` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `request_id` int(11) DEFAULT NULL,
  `feature_name` varchar(30) DEFAULT NULL,
  `result` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- Create syntax for TABLE 'requests'
CREATE TABLE `requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `req_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` CHAR(15) DEFAULT NULL,
  `perf_dns` float DEFAULT NULL,
  `perf_connect` float DEFAULT NULL,
  `perf_req` float DEFAULT NULL,
  `perf_resp` float DEFAULT NULL,
  `ua_family` varchar(30) DEFAULT NULL,
  `ua_version` varchar(10) DEFAULT '',
  `country` varchar(3) DEFAULT NULL,
  `data_center` char(4) DEFAULT '',
  `refer_domain` varchar(50) DEFAULT NULL,
  `elapsed_msec` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `report` (`req_time`,`data_center`,`country`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

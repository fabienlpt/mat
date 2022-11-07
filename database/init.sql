CREATE DATABASE IF NOT EXISTS test;

USE test;
CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

USE test;
INSERT INTO `material` (`name`, `description`) VALUES
('Laptop', 'computer lenovo'),
('Laptop', 'computer dell'),
('Laptop', 'computer samsung'),
('Laptop', 'computer apple');
CREATE DATABASE IF NOT EXISTS lend_nws;

-- CREATE USER IF NOT EXISTS 'lend_nws'@'emanresu' IDENTIFIED BY 'dr0wss4p';

USE lend_nws;
CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `material` (`name`, `description`) VALUES
('Laptop', 'computer lenovo'),
('Laptop', 'computer dell'),
('Laptop', 'computer samsung'),
('Laptop', 'computer apple'),
('Smartphone', 'smartphone lenovo'),
('Smartphone', 'smartphone dell'),
('Smartphone', 'smartphone samsung'),
('Smartphone', 'smartphone apple'),
('Tablet', 'tablet lenovo'),
('Tablet', 'tablet dell'),
('Tablet', 'tablet samsung'),
('Tablet', 'tablet apple'),
('Camera', 'camera lenovo'),
('Camera', 'camera dell'),
('Camera', 'camera samsung'),
('Camera', 'camera apple'),
('TV', 'tv lenovo'),
('TV', 'tv dell'),
('TV', 'tv samsung'),
('TV', 'tv apple'),
('Monitor', 'monitor lenovo'),
('Monitor', 'monitor dell'),
('Monitor', 'monitor samsung'),
('Monitor', 'monitor apple');


CREATE TABLE IF NOT EXISTS `lend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `material_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lend_date` date NOT NULL,
  `return_date` date NOT NULL,
  `is_returned` boolean NOT NULL DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `lend` (`material_id`, `user_id`, `lend_date`, `return_date`, `is_returned`) VALUES
(1, 1, '2022-10-01', '2023-10-01', true),
(2, 1, '2022-10-01', '2023-10-01', false),
(3, 2, '2022-10-01', '2023-10-01', false),
(4, 2, '2022-10-01', '2023-10-01', false),
(5, 3, '2022-10-01', '2023-10-01', false),
(6, 4, '2022-10-01', '2023-10-01', false),
(7, 6, '2022-10-01', '2023-10-01', false),
(8, 5, '2022-10-01', '2023-10-01', false),
(9, 7, '2022-10-01', '2023-10-01', false),
(10, 8, '2022-10-01', '2023-10-01', true);
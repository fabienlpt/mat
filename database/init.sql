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
  `email` varchar(255) NOT NULL,
  `lend_date` date NOT NULL,
  `return_date` date NOT NULL,
  `is_returned` boolean NOT NULL DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `lend` (`material_id`, `email`, `lend_date`, `return_date`, `is_returned`) VALUES
(1, 'test@gmail.com', '2022-10-01', '2023-10-01', true),
(2, 'test2@gmail.com', '2022-10-01', '2023-10-01', false),
(3, 'test3@gmail.com', '2022-10-01', '2023-10-01', false),
(4, 'test4@gmail.com', '2022-10-01', '2023-10-01', false),
(5, 'test5@gmail.com', '2022-10-01', '2023-10-01', false),
(6, 'test6@gmail.com', '2022-10-01', '2023-10-01', false),
(7, 'test7@gmail.com', '2022-10-01', '2023-10-01', false),
(8, 'test8@gmail.com', '2022-10-01', '2023-10-01', false),
(9, 'test9@gmail.com', '2022-10-01', '2023-10-01', false),
(10, 'test10@gmail.com', '2022-10-01', '2023-10-01', true);
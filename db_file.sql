-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `master_categories`;
CREATE TABLE `master_categories` (
  `iCategoriesId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto incremented ',
  `vCategorieName` varchar(50) NOT NULL,
  `vCategorieStatus` int(4) NOT NULL DEFAULT '1',
  `iAddedByUserId` int(11) NOT NULL COMMENT 'user name who add this Categorie',
  `iAddedOn` int(11) NOT NULL COMMENT 'date of addition',
  `iUpdated` int(11) NOT NULL COMMENT 'date of updation',
  PRIMARY KEY (`iCategoriesId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `master_categories` (`iCategoriesId`, `vCategorieName`, `vCategorieStatus`, `iAddedByUserId`, `iAddedOn`, `iUpdated`) VALUES
(1,	'games',	1,	1,	1544279934,	1544279934),
(2,	'movies',	1,	1,	1544278250,	1544278250),
(3,	'test',	1,	0,	1544278250,	1544278250);

DROP TABLE IF EXISTS `master_product`;
CREATE TABLE `master_product` (
  `iProductId` int(11) NOT NULL,
  `iCategorieId` int(11) NOT NULL COMMENT 'FK For master_categories',
  `iProductStatus` int(4) NOT NULL COMMENT 'Delete or not',
  `vTitle` varchar(50) NOT NULL,
  `vImage_path` int(4) NOT NULL,
  `fPrice` decimal(10,2) NOT NULL,
  `iAddedByUserId` int(11) NOT NULL COMMENT 'Added by user id',
  `vdescription` varchar(200) NOT NULL,
  `iAddedOn` int(11) NOT NULL COMMENT 'date of addition ',
  `iUpdated` int(11) NOT NULL COMMENT 'date of updation'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `master_users`;
CREATE TABLE `master_users` (
  `iUserId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User auto increment id for user',
  `vUserName` varchar(100) NOT NULL COMMENT 'User unique user name',
  `vPassword` varchar(100) NOT NULL COMMENT 'User Password',
  `vFname` varchar(100) NOT NULL COMMENT 'User first name',
  `vLname` varchar(100) NOT NULL COMMENT 'User Last name',
  `iMobileNo` int(11) NOT NULL COMMENT 'User Mobile no',
  `vEmail_id` varchar(100) NOT NULL COMMENT 'User Email Id',
  `vUserSecurityQuestion` varchar(100) NOT NULL COMMENT 'For Forgot user qus',
  `vUserSecurityQuestionAns` varchar(100) NOT NULL COMMENT 'For Forgot user qus ans',
  `iLastProfileUpdate` int(11) NOT NULL COMMENT 'date for last profile update',
  `iActiveStatus` int(4) NOT NULL DEFAULT '1' COMMENT 'user active status',
  PRIMARY KEY (`iUserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- 2018-12-08 14:43:16

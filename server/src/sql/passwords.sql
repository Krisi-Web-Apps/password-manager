CREATE TABLE IF NOT EXISTS `passwords` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(255) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `desc` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NOT NULL,
    INDEX `USER_ID` (`user_id`),
    PRIMARY KEY (`id`)
);
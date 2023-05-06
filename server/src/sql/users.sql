CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(75) NOT NULL,
    `last_name` VARCHAR(75) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `role_as` VARCHAR(10) NOT NULL DEFAULT 'user',
    PRIMARY KEY (`id`),
    UNIQUE `username` (`username`),
    UNIQUE `email` (`email`)
) ENGINE = InnoDB;

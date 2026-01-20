CREATE TABLE `backup_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`backupId` varchar(100) NOT NULL,
	`description` text,
	`fileSize` int,
	`fileUrl` text,
	`tablesIncluded` text,
	`filesIncluded` int DEFAULT 0,
	`createdBy` varchar(255),
	`status` enum('creating','completed','failed') NOT NULL DEFAULT 'creating',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `backup_history_id` PRIMARY KEY(`id`),
	CONSTRAINT `backup_history_backupId_unique` UNIQUE(`backupId`)
);

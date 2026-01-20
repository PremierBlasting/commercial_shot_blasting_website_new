CREATE TABLE `version_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`versionId` varchar(100) NOT NULL,
	`description` text,
	`changesSummary` text,
	`createdBy` varchar(255),
	`isCurrent` boolean NOT NULL DEFAULT false,
	`screenshotUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `version_history_id` PRIMARY KEY(`id`),
	CONSTRAINT `version_history_versionId_unique` UNIQUE(`versionId`)
);

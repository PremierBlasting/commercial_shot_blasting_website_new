CREATE TABLE `seo_metadata` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageUrl` varchar(500) NOT NULL,
	`pageType` varchar(50) NOT NULL,
	`metaTitle` varchar(255),
	`metaDescription` text,
	`h1` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_metadata_id` PRIMARY KEY(`id`),
	CONSTRAINT `seo_metadata_pageUrl_unique` UNIQUE(`pageUrl`)
);

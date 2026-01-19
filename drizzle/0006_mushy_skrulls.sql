CREATE TABLE `performance_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`value` double NOT NULL,
	`rating` varchar(20) NOT NULL,
	`delta` double NOT NULL,
	`metricId` varchar(100) NOT NULL,
	`navigationType` varchar(50),
	`url` varchar(500) NOT NULL,
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `performance_metrics_id` PRIMARY KEY(`id`)
);

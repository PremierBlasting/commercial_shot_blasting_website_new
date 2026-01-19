CREATE TABLE `call_tracking_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`location` varchar(255) NOT NULL,
	`phoneNumber` varchar(50) NOT NULL,
	`userAgent` text,
	`ipAddress` varchar(45),
	`referrer` text,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `call_tracking_events_id` PRIMARY KEY(`id`)
);

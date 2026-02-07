CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_on` text DEFAULT '2026-02-07T19:47:02.265Z' NOT NULL,
	`updated_on` text DEFAULT '2026-02-07T19:47:02.266Z' NOT NULL,
	`username` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text NOT NULL,
	`platform` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `category_objectives` (
	`category_id` integer NOT NULL,
	`objective_id` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`objective_id`) REFERENCES `objectives`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_on` text DEFAULT '2026-02-07T19:47:02.274Z' NOT NULL,
	`updated_on` text DEFAULT '2026-02-07T19:47:02.274Z' NOT NULL,
	`name` text NOT NULL,
	`objective_id` integer NOT NULL,
	`description` text,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event_categories` (
	`event_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_on` text DEFAULT '2026-02-07T19:47:02.277Z' NOT NULL,
	`updated_on` text DEFAULT '2026-02-07T19:47:02.277Z' NOT NULL,
	`title` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`location` text,
	`description` text,
	`source` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `objectives` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_on` text DEFAULT '2026-02-07T19:47:02.273Z' NOT NULL,
	`updated_on` text DEFAULT '2026-02-07T19:47:02.273Z' NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`color` text NOT NULL
);

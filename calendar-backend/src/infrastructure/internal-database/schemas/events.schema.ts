import { pgTable, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { categorySchema } from "./category.schema.ts";


export const eventSchema = pgTable("events", {
    id: serial("id").primaryKey(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    updatedOn: timestamp("updated_on").defaultNow().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    location: varchar("location", { length: 255 }),
    description: varchar("description", { length: 1024 }),
    source: varchar("source", { length: 255 }).notNull(),
});

export const eventCategorySchema = pgTable("event_categories", {
    eventId: serial("event_id")
        .notNull().references(() => eventSchema.id),
    categoryId: serial("category_id")
        .notNull()
        .references(() => categorySchema.id),
});

// Interface representing an Event record in the database
export interface EventDatabaseRecord {
    id: number;
    createdOn: Date;
    updatedOn: Date;
    categories: number[];
    title: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    description?: string;
    source: string;
}

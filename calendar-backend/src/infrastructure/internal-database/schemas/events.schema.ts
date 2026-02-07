import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { categorySchema } from "./category.schema.ts";
import { getNow } from "../../database-utilities.ts";

export const eventSchema = sqliteTable("events", {
    id: integer("id").primaryKey(),
    createdOn: text("created_on").default(getNow()).notNull(),
    updatedOn: text("updated_on").default(getNow()).notNull(),
    title: text("title").notNull(),
    startDate: text("start_date").notNull(),
    endDate: text("end_date").notNull(),
    location: text("location"),
    description: text("description"),
    source: text("source").notNull(),
});

export const eventCategorySchema = sqliteTable("event_categories", {
    eventId: integer("event_id")
        .notNull().references(() => eventSchema.id),
    categoryId: integer("category_id")
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

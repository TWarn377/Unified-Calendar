import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { objectiveSchema } from "./objective.schema.ts";

export const categorySchema = pgTable("categories", {
    id: serial("id").primaryKey(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    updatedOn: timestamp("updated_on").defaultNow().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    objectiveId: serial("objective_id").notNull(),
    description: varchar("description", { length: 1024 }),
    color: varchar("color", { length: 7 }).notNull(),
});

export const categoryObjectiveSchema = pgTable("category_objectives", {
    categoryId: serial("category_id")
        .notNull().references(() => categorySchema.id),
    objectiveId: serial("objective_id")
        .notNull().references(() => objectiveSchema.id),
});

// Interface representing an Event record in the database
export interface CategoryDatabaseRecord {
    id: number;
    createdOn?: Date;
    updatedOn?: Date;
    name: string;
    description?: string;
    color: string;
}
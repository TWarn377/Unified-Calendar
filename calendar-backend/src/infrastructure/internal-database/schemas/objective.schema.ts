import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const objectiveSchema = pgTable("objectives", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1024 }),
    color: varchar("color", { length: 7 }).notNull(),
});

// Interface representing an Objective record in the database
export interface ObjectiveDatabaseRecord {
    id: number;
    name: string;
    description?: string;
    color: string;
}
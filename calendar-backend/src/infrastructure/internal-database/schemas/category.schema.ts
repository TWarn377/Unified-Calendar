import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { objectiveSchema } from "./objective.schema.ts";
import { getNow } from "../../database-utilities.ts";


export const categorySchema = sqliteTable("categories", {
    id: integer("id").primaryKey(),
    createdOn: text("created_on").default(getNow()).notNull(),
    updatedOn: text("updated_on").default(getNow()).notNull(),
    name: text("name").notNull(),
    objectiveId: integer("objective_id").notNull(),
    description: text("description"),
    color: text("color").notNull(),
});


// Interface representing an Event record in the database
export interface CategoryDatabaseRecord {
    id: number;
    createdOn?: Date;
    updatedOn?: Date;
    name: string;
    description?: string;
    color: string;
    objectiveId: number;
}

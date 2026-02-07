import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { getNow } from "../../database-utilities.ts";

export const objectiveSchema = sqliteTable("objectives", {
    id: integer("id").primaryKey(),
    createdOn: text("created_on").default(getNow()).notNull(),
    updatedOn: text("updated_on").default(getNow()).notNull(),
    name: text("name").notNull(),
    description: text("description"),
    color: text("color").notNull(),
});

// Interface representing an Objective record in the database
export interface ObjectiveDatabaseRecord {
    id: number;
    name: string;
    description?: string;
    color: string;
}

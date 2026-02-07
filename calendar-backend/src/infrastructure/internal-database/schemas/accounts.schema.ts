import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { getNow } from "../../database-utilities.ts";

export const accountSchema = sqliteTable("accounts", {
    id: integer("id").primaryKey(),
    createdOn: text("created_on").default(getNow()).notNull(),
    updatedOn: text("updated_on").default(getNow()).notNull(),
    username: text("username").notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email").notNull(),
    platform: text("platform").notNull(),
    passwordHash: text("password_hash").notNull(),
});

export interface AccountDatabaseRecord {
    id: number;
    createdOn: Date;
    updatedOn: Date;
    username: string;
    email: string;
    platform: string;
    passwordHash: string;
};
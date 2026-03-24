import { drizzle } from 'drizzle-orm/libsql';

const PORT = process.env.SERVER_PORT || 3000;

const connection = {
    url: process.env.DATABASE_URL || `file:${process.env.DB_FILE_NAME}`, 
    //authToken: process.env.DATABASE_AUTH_TOKEN 
}

console.log(`Connecting to database at ${connection.url}`);

// You can specify any property from the libsql connection options
export const db = drizzle({ connection: connection });

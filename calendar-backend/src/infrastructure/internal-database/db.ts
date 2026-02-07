import { drizzle } from 'drizzle-orm/libsql';

const PORT = process.env.SERVER_PORT || 3000;

const connection = {
    url: process.env.DATABASE_URL, 
    //authToken: process.env.DATABASE_AUTH_TOKEN 
}

// You can specify any property from the libsql connection options
export const db = drizzle({ connection: { url: process.env.DB_FILE_NAME! }});

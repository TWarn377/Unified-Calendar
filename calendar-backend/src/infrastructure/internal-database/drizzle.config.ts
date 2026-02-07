import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
      url: "file:local.db" // file: prefix is required by libsql
  },
  schema: "./src/infrastructure/internal-database/schemas",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: false,
  verbose: true,
});

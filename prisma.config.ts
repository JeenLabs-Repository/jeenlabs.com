import "dotenv/config"
import { defineConfig } from "prisma/config"
import { getDatabaseUrl } from "./src/lib/database-url"

/**
 * CLI (migrate, studio) reads DB_* or DATABASE_URL from `.env`.
 * Fallback is only for `prisma generate` when .env is not created yet.
 */
const databaseUrl = (() => {
  try {
    return getDatabaseUrl()
  } catch {
    return "mysql://root:password@localhost:3306/jeenlabs"
  }
})()

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
})

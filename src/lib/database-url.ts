export type DatabaseConfig = {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export function getDatabaseConfigFromEnv(): DatabaseConfig | null {
  const host = process.env.DB_HOST
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const database = process.env.DB_NAME
  const port = process.env.DB_PORT

  if (!host && !user && password === undefined && !database) {
    return null
  }

  if (!host || !user || password === undefined || !database) {
    throw new Error(
      "MySQL env incomplete. Set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (and optionally DB_PORT).",
    )
  }

  const parsedPort = port ? Number(port) : 3306
  if (!Number.isFinite(parsedPort)) {
    throw new Error("DB_PORT must be a valid number.")
  }

  return {
    host,
    port: parsedPort,
    user,
    password,
    database,
  }
}

export function buildDatabaseUrl(config: DatabaseConfig): string {
  const user = encodeURIComponent(config.user)
  const password = encodeURIComponent(config.password)
  return `mysql://${user}:${password}@${config.host}:${config.port}/${config.database}`
}

/**
 * Resolves the MySQL URL for Prisma and the MariaDB adapter.
 * `DATABASE_URL` wins when set; otherwise builds from `DB_*` variables.
 */
export function getDatabaseUrl(): string {
  const explicit = process.env.DATABASE_URL?.trim()
  if (explicit) {
    return explicit
  }

  const config = getDatabaseConfigFromEnv()
  if (!config) {
    throw new Error(
      "Database not configured. Set DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.",
    )
  }

  return buildDatabaseUrl(config)
}

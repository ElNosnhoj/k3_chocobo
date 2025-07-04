/**=====================================================================
 * file: db.ts
 * desc: drizzle lib file to manage database
 *=====================================================================*/
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_CONNECTION_STRING
})

export const db = drizzle(pool)
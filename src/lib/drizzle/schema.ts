/**=====================================================================
 * file: schema.ts
 * desc: database table schema
 *=====================================================================*/
import { pgTable, serial, text, integer, timestamp, smallint } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    role: text('role').default('user').notNull(),
    createdAt: timestamp('created_at').defaultNow()
})


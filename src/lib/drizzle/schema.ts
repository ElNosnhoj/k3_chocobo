/**=====================================================================
 * file: schema.ts
 * desc: database table schema
 *=====================================================================*/
import { pgTable, serial, text, integer, timestamp, smallint, uuid } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    username: text('username').notNull().unique(),
    role: text('role').default('user').notNull(),
    createdAt: timestamp('created_at').defaultNow()
})

export const sessionEntries = pgTable('session_entries', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid("user_id").references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').defaultNow(),

    stationName: text('station_name').notNull(),
    datetimeStart: timestamp('datetime_start').notNull(),
    datetimeEnd: timestamp('datetime_end').notNull(),

    fabricatedQty: smallint('fabricated_qty').notNull().default(0),

    changeoverQty: smallint('changeover_qty').notNull().default(0),
    linechangeQty: smallint('linechange_qty').notNull().default(0),

    issueDuration: smallint('issue_duration').notNull().default(0),
    issueNotes: text('issue_notes'),

    defectQty: smallint('defect_qty').notNull().default(0),
    defectNotes: text('defect_notes'),
})

export type SessionEntryProp =
    typeof sessionEntries.$inferSelect & {
        username?: string | null
    }
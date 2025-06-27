'use server'
import { db } from "@/lib/drizzle/db"
import { eq, and, gt, desc, SQL, Column, getTableColumns } from "drizzle-orm"
import { sessionEntries, SessionEntryProp, users } from "@/lib/drizzle/schema"
import { PgSelectBase } from "drizzle-orm/pg-core"

// interface GetEntriesProps {
//     keys?: (keyof SessionEntryProp)[]
//     where?: SQL
// }

// export const getEntries = async ({ keys, where }: GetEntriesProps = {}) => {
//     const select = keys?.length
//         ? keys.reduce((acc, key) => {
//             if (key === 'username') {
//                 acc[key] = users.username
//             }
//             else {
//                 acc[key] = sessionEntries[key as (keyof typeof sessionEntries)]
//             }
//             return acc;
//         }, {} as Partial<Record<keyof SessionEntryProp, any>>)
//         : { ...getTableColumns(sessionEntries), username: users.username };

//     // console.log("===============")
//     // console.log(select)
//     // console.log("===============")

//     const rows = await db
//         .select(select)
//         .from(sessionEntries)
//         .leftJoin(users, eq(sessionEntries.userId, users.id))
//         .where(where)
//     return rows
// }

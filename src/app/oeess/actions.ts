'use server'
import { db } from "@/lib/drizzle/db";
import { eq, and, gt, desc, sql, lt, gte } from "drizzle-orm";
import { sessionEntries, SessionEntryProp, users } from "@/lib/drizzle/schema";
import { stationOptions } from "@/components/ui/station-selector";

// export async function getEntries() {
//     const entries = await db.select({
//         id: sessionEntries.id,
//         userId: sessionEntries.userId,
//         createdAt: sessionEntries.createdAt,
//         stationName: sessionEntries.stationName,
//         datetimeStart: sessionEntries.datetimeStart,
//         datetimeEnd: sessionEntries.datetimeEnd,
//         fabricatedQty: sessionEntries.fabricatedQty,
//         changeoverQty: sessionEntries.changeoverQty,
//         linechangeQty: sessionEntries.linechangeQty,
//         issueDuration: sessionEntries.issueDuration,
//         issueNotes: sessionEntries.issueNotes,
//         defectQty: sessionEntries.defectQty,
//         defectNotes: sessionEntries.defectNotes,
//     })
//     .from(sessionEntries)
//     .orderBy(desc(sessionEntries.datetimeStart))
//     console.log("hello?")
//     return entries
// }
export const getEntriesLastYearOverview = async () => {
    const lastyear = new Date()
    lastyear.setFullYear(lastyear.getFullYear() - 1)
    const entries = await db.select({
        datetimeStart: sessionEntries.datetimeStart,
    })
        .from(sessionEntries)
        .orderBy(desc(sessionEntries.datetimeStart))
        .where(gt(sessionEntries.datetimeStart, lastyear))
    console.log("hello?")
    return entries
}

export const getMonthStationData = async (station: typeof stationOptions[number], month: number) => {
    const start = new Date(2025, month, 1)
    const end = new Date(2025, month + 1, 1)
    const res = await db.select({
        datetimeStart: sessionEntries.datetimeStart,
    })
        .from(sessionEntries)
        // .orderBy(desc(sessionEntries.datetimeStart))
        .orderBy(sessionEntries.datetimeStart)
        .where(
            and(
                eq(sessionEntries.stationName, station),
                gte(sessionEntries.datetimeStart, start),
                lt(sessionEntries.datetimeStart, end),
            )
        )
    return res
}

export const getAvailableMonthsFromLastYear = async (station: typeof stationOptions[number]) => {
    const lastyear = new Date()
    lastyear.setFullYear(lastyear.getFullYear() - 1)
    const entries = await db.select({
        datetimeStart: sessionEntries.datetimeStart,
    })
        .from(sessionEntries)
        .orderBy(desc(sessionEntries.datetimeStart))
        .where(and(eq(sessionEntries.stationName, station), gt(sessionEntries.datetimeStart, lastyear)))

    const months = Array.from(new Set(
        entries.map(item => new Date(item.datetimeStart).getMonth())
    ))
    return months
}


// .leftJoin(users, eq(sessionEntries.userId, users.id))
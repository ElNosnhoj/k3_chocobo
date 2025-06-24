import { NextRequest, NextResponse } from "next/server"
import { getStationSessionData } from "@/lib/session/station-session";
import { getAuthSessionData } from "@/lib/session/auth-session";
import { defaultStationSessionData, StationSessionData } from "@/types/station-types";
import { db } from "@/lib/drizzle/db";
import { eq, and, gt, desc } from "drizzle-orm"; // Import desc
import { sessionEntries, SessionEntryProp, users } from "@/lib/drizzle/schema";

export const POST = async (req: NextRequest) => {
    const auth = await getAuthSessionData()
    const station = await getStationSessionData()

    // maybe handle taking json data

    if (!station) {
        return new NextResponse("no station data", { status: 500 })
    }

    try {
        const res = await db.insert(sessionEntries).values({
            userId: auth.userId,
            stationName: station.stationName,
            datetimeStart: new Date(station.datetimeStart),
            datetimeEnd: new Date(station.datetimeEnd),
            fabricatedQty: station.fabricatedQty,
            changeoverQty: station.changeOver ? station.changeOverQty : defaultStationSessionData.changeOverQty,
            linechangeQty: station.changeOver ? station.lineChangeQty : defaultStationSessionData.lineChangeQty,
            issueDuration: station.issue ? station.issueDuration : defaultStationSessionData.issueDuration,
            issueNotes: station.issue ? station.issueNote : defaultStationSessionData.issueNote,
            defectQty: station.defect ? station.defectQTY : defaultStationSessionData.defectQTY,
            defectNotes: station.defect ? station.defectNote : defaultStationSessionData.defectNote
        })

        station.destroy()
        await station.save()
        return new Response("insert success", { status: 200 })
    }
    catch {
        return new Response("insert failed", { status: 500 })
    }

}

export const GET = async (req: NextRequest) => {
    const auth = await getAuthSessionData()
    const lastweek = new Date()
    lastweek.setDate(lastweek.getDate() - 7)

    const entries = await db.select({
        id: sessionEntries.id,
        userId: sessionEntries.userId,
        createdAt: sessionEntries.createdAt,
        stationName: sessionEntries.stationName,
        datetimeStart: sessionEntries.datetimeStart,
        datetimeEnd: sessionEntries.datetimeEnd,
        fabricatedQty: sessionEntries.fabricatedQty,
        changeoverQty: sessionEntries.changeoverQty,
        linechangeQty: sessionEntries.linechangeQty,
        issueDuration: sessionEntries.issueDuration,
        issueNotes: sessionEntries.issueNotes,
        defectQty: sessionEntries.defectQty,
        defectNotes: sessionEntries.defectNotes,
        ...(auth.role === 'admin' && { username: users.username }),
    })
        .from(sessionEntries)
        .leftJoin(users, eq(sessionEntries.userId, users.id))
        .where(and(
            auth.role !== 'admin' ? eq(sessionEntries.userId, auth.userId) : undefined,
            gt(sessionEntries.datetimeStart, lastweek)
        ))
        .orderBy(desc(sessionEntries.datetimeStart))

    return new NextResponse(JSON.stringify(entries), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const PATCH = async (req: NextRequest) => {
    try {
        const updatedEntry = await req.json() as SessionEntryProp;

        if (!updatedEntry || !updatedEntry.id) {
            return new Response("Invalid entry data or missing ID", { status: 400 });
        }

        const result = await db.update(sessionEntries)
            .set({
                stationName: updatedEntry.stationName,
                datetimeStart: new Date(updatedEntry.datetimeStart),
                datetimeEnd: new Date(updatedEntry.datetimeEnd),
                fabricatedQty: updatedEntry.fabricatedQty,
                changeoverQty: updatedEntry.changeoverQty,
                linechangeQty: updatedEntry.linechangeQty,
                issueDuration: updatedEntry.issueDuration,
                issueNotes: updatedEntry.issueNotes,
                defectQty: updatedEntry.defectQty,
                defectNotes: updatedEntry.defectNotes,
            })
            .where(eq(sessionEntries.id, updatedEntry.id));

        console.log("Update result:", result);

        return new Response("Entry updated successfully", { status: 200 });

    } catch (error) {
        console.error("Error updating entry:", error);
        return new Response("Failed to update entry", { status: 500 });
    }
}

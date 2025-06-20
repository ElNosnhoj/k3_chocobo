/**=====================================================================
 * file: api/auth/upload/route.ts
 * desc: upload session's station data to server
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { redirect } from "next/navigation";

import { db } from "@/lib/drizzle/db";
import { sessionEntries } from "@/lib/drizzle/schema";
import { defaultStationData, StationData } from "@/lib/session/data-interface";


export const POST = async (req: NextRequest) => {
    const session = await getSessionData()
    let stationData;

    try {
        stationData = await req.json() as StationData
    }
    catch {
        stationData = session.stationData
    }

    if (!stationData) {
        return new Response("no station data", { status: 400 })
    }


    try {
        // const res = await db.insert(sessionEntries).values({
        //     userId: session.userId,
        //     stationName: stationData.stationName,
        //     datetimeStart: new Date(stationData.datetimeStart),
        //     datetimeEnd: new Date(stationData.datetimeEnd),
        //     fabricatedQty: stationData.fabricatedQty,
        //     changeoverQty: stationData.changeOverQty,
        //     linechangeQty: stationData.lineChangeQty,
        //     issueDuration: stationData.issueDuration,
        //     issueNotes: stationData.issueNote,
        //     defectQty: stationData.defectQTY,
        //     defectNotes: stationData.defectNote
        // })
        const res = await db.insert(sessionEntries).values({
            userId: session.userId,
            stationName: stationData.stationName,
            datetimeStart: new Date(stationData.datetimeStart),
            datetimeEnd: new Date(stationData.datetimeEnd),
            fabricatedQty: stationData.fabricatedQty,
            changeoverQty: stationData.changeOver?stationData.changeOverQty:defaultStationData.changeOverQty,
            linechangeQty: stationData.changeOver?stationData.lineChangeQty:defaultStationData.lineChangeQty,
            issueDuration: stationData.issue?stationData.issueDuration:defaultStationData.issueDuration,
            issueNotes: stationData.issue?stationData.issueNote:defaultStationData.issueNote,
            defectQty: stationData.defect?stationData.defectQTY:defaultStationData.defectQTY,
            defectNotes: stationData.defect?stationData.defectNote:defaultStationData.defectNote
        })

        session.stationData = undefined
        await session.save()
        return new Response("temp", { status: 200 })
    }
    catch {
        return new Response("failed", { status: 404 })
    }
}




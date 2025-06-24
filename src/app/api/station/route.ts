import { NextRequest, NextResponse } from "next/server"
import { defaultStationSessionData } from "@/types/station-types";
import { getStationSessionData } from "@/lib/session/station-session";

// set data to default values
export const POST = async (req: NextRequest) => {
    console.log("asdlksa;kdjaklajsdlkdsa")
    const stationSession = await getStationSessionData()
    Object.assign(stationSession, defaultStationSessionData)
    stationSession.datetimeStart = new Date().toISOString()
    await stationSession.save()
    return NextResponse.json({ ok: true }, { status: 200 })
}

// get the station data
export const GET = async (req: NextRequest) => {
    const stationSession = await getStationSessionData()
    return NextResponse.json(stationSession)
    try {
        return NextResponse.json({ ok: true, session: stationSession }, { status: 200 })
    }
    catch {
        return NextResponse.json({ ok: false, error: 'Failed to load session' }, { status: 500 })
    }
}

// replace the data
export const PUT = async (req: NextRequest) => {
    const newSessionData = await req.json() // full new data
    const stationSession = await getStationSessionData()

    Object.assign(stationSession, newSessionData)

    await stationSession.save()
    return NextResponse.json({ ok: true, session: stationSession })
}

// for now same as PUT
export const PATCH = async (req: NextRequest) => {
    const updates = await req.json() // partial data to update
    const stationSession = await getStationSessionData()

    Object.assign(stationSession, updates)

    await stationSession.save()
    return NextResponse.json({ ok: true, session: stationSession })
}


// purge stationSession
export const DELETE = async (req: NextRequest) => {
    const stationSession = await getStationSessionData()
    await stationSession.destroy()
    return NextResponse.json({ ok: true }, { status: 200 })
}
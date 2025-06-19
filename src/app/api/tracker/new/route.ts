/**=====================================================================
 * file: api/auth/session/route.ts
 * desc: retrieve session data
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { defaultStationData } from "@/lib/session/data-interface";
import { redirect } from "next/navigation";

// retrieve session data
export const POST = async (req: NextRequest)=>{
    const session = await getSessionData()
    session.stationData = defaultStationData
    session.stationData.datetimeStart = new Date().toISOString()
    await session.save()
    return redirect('/tracker/session')
}




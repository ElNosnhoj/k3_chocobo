/**=====================================================================
 * file: api/auth/upload/route.ts
 * desc: upload session's station data to server
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { redirect } from "next/navigation";

import { db } from "@/lib/drizzle/db";


export const POST = async (req: NextRequest)=>{
    const session = await getSessionData()
    const stationData = session.stationData

    return new Response("temp", { status: 200 })
    return redirect("/tracker")
}




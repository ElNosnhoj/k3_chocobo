/**=====================================================================
 * file: api/auth/session/route.ts
 * desc: retrieve session data
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { defaultSessionData } from "@/lib/session/data-interface";

// retrieve session data
export const GET = async (req: NextRequest)=>{
    const session = await getSessionData()
    if (!session.isLoggedIn) return Response.json(defaultSessionData)
    return Response.json(session)
}




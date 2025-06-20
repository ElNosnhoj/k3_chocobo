/**=====================================================================
 * file: api/auth/session/route.ts
 * desc: retrieve session data
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { defaultSessionData } from "@/lib/session/data-interface";

// retrieve session data
export const GET = async (req: NextRequest) => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return Response.json(defaultSessionData)
    return Response.json(session)
}

export const POST = async (req: NextRequest) => {
    const session = await getSessionData()
    try {
        const data = await req.json()


        // if (data==session?.stationData)
            // return new Response(JSON.stringify({ message: 'data is the same?' }), { status: 200 })
        
        session.stationData = data
        await session.save()
        return new Response(JSON.stringify({ message: 'Session data updated' }), { status: 200 })
    }
    catch (error) {
        console.error('Error updating session data:', error);
        return new Response(JSON.stringify({ message: 'Failed to update session data' }), { status: 500 });
    }
}


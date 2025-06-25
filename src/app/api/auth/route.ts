/**=====================================================================
 * file: api/auth/login/route.ts
 * desc: logout!
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getAuthSessionData } from "@/lib/session/auth-session";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getStationSessionData } from "@/lib/session/station-session";
import { defaultAuthSessionData } from "@/types/auth-types";


const getUserData = async (username: string) => {
    const usersFound = await db
        .select({
            id: users.id,
            role: users.role,
        })
        .from(users)
        .where(eq(users.username, username))
    return usersFound?.[0]
}


// attempt login
export const POST = async (req: NextRequest) => {
    let username;
    try {
        username = await req.json()
    }
    catch {
        username = (await req.formData()).get('username') as string
    }
    if (!username) return new Response("Username not specified", { status: 400 })
    
    // check database for validitiy
    const userData = await getUserData(username)
    if (!userData) return new Response("Invalid User", { status: 401 })

    // looks good so store session data and save
    const session = await getAuthSessionData()
    session.username = username
    session.role = userData.role
    session.userId = userData.id
    session.isLoggedIn = true
    await session.save()

    return redirect("/home")
}



// logout
export const DELETE = async (req: NextRequest) => {
    console.log("logger outerrooo")
    const session = await getAuthSessionData()
    const station = await getStationSessionData()
    
    session.destroy()
    await session.save()
    station.destroy()
    await station.destroy()
    return redirect('/login')
}




// retrieve session data
export const GET = async (req: NextRequest) => {
    const session = await getAuthSessionData()
    if (!session.isLoggedIn) return Response.json(defaultAuthSessionData)
    return Response.json(session)
}



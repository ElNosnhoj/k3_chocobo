/**=====================================================================
 * file: api/auth/login/route.ts
 * desc: logout!
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


const getUserData = async (username: string) => {
    const usersFound = await db
        .select({
            role: users.role
        })
        .from(users)
        .where(eq(users.username, username))
    console.log(usersFound?.[0])
    return usersFound?.[0]
}


// attempt login
export const POST = async (req: NextRequest) => {
    // get username
    // const formData = await req.formData()
    // const username = formData.get('username') as string
    // if (!username) return new Response("Username not specified", { status: 400 })

    // get username. try from body and form
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
    const session = await getSessionData()
    session.username = username
    session.role = userData.role
    session.isLoggedIn = true
    await session.save()

    return redirect("/home")
}


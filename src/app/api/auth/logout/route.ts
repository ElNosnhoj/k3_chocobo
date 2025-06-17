/**=====================================================================
 * file: api/auth/logout/route.ts
 * desc: logout!
 *=====================================================================*/
import { NextRequest } from "next/server"
import { getSessionData } from "@/lib/session/session";
import { redirect } from "next/navigation";

export const POST = async (req: NextRequest) => {
    const session = await getSessionData()
    
    session.destroy()
    await session.save()
    return redirect('/login')
}




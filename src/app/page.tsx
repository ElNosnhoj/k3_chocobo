import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";

export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')
    return redirect('/home')
}


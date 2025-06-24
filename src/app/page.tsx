import { redirect } from "next/navigation";
import { getAuthSessionData } from "@/lib/session/auth-session";

export default async () => {
    const session = await getAuthSessionData()
    if (!session.isLoggedIn) return redirect('/login')
    return redirect('/home')
}


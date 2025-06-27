import { redirect } from "next/navigation";
import { getAuthSessionData } from "@/lib/session/auth-session";

export default async () => {
    return redirect('/home')
}


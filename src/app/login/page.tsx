import { EggFried } from "lucide-react"
import { LoginForm } from './login-form'

import { redirect } from "next/navigation";
import { getSessionData, SessionData } from "@/lib/session";

// export default async ()=>{
//     const session = await getSessionData()
//     if (session.isLoggedIn) return redirect('/home')
//     return (
//         <main>login page</main>
//     )
// }


export default async () => {
    const session = await getSessionData()
    if (session.isLoggedIn) return redirect('/home')
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <EggFried className="size-4" />
                    </div>
                    Chocobo Inc.
                </a>
                <LoginForm />
            </div>
        </div>
    )
}
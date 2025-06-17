import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";

// export default function Home() {
//     return (
//         <main className="font-[family-name:var(--font-geist-sans)]">
//             hello world
//         </main>
//     )
// }


export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')
    return redirect('/home')
}


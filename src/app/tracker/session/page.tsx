/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Station from "./station";



export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                <Station/>
            </main>

            <Footer name={session.username}/>
        </div>
    )
}


// flex flex-col items-center p-6 mx-auto w-full max-w-screen-md bg-blue-100 m-1
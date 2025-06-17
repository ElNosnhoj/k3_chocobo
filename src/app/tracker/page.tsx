/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import DashboardNavCard from "@/components/ui/dashboard-nav-card";

export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')

    // console.log(session?.stationData)
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                {session?.stationData
                    ? <></>
                    : <></>
                }
                tracker
            </main>

            <Footer name={session.username} />
        </div>
    )
}




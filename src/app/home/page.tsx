/**=====================================================================
 * file: home/page.tsx
 * desc: dashboard user sees on login
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Activity } from "lucide-react";
import DashboardNavCard from "@/components/ui/dashboard-nav-card";


export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <DashboardNavCard
                        title="Template"
                        desc="This is some dummy button to nav to different pages. All hail chocogods."
                    />
                    <DashboardNavCard
                        title="Session Tracker"
                        Icon={Activity} // Replace with appropriate icon if needed
                        desc="Track data for your machines, including fabricated parts, defects, and issues."
                        href="/tracker"
                    />
                </div>
            </main>

            <Footer name={session.username}/>
        </div>
    )
}

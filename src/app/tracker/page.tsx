/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import DashboardNavCard from "@/components/ui/dashboard-nav-card";
import { Database, DatabaseZap, Eye } from "lucide-react";
import AlertWrapper from "@/components/ui/alert-wrapper/server";


export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')

    const handleStartSession = () => {
        console.log("Starting new session...");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                {/* {session?.stationData
                    ? <></>
                    : <></>
                } */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


                    {session?.stationData &&
                        <DashboardNavCard
                            title="Continue Session"
                            Icon={DatabaseZap}
                            desc="Continue your currently running session"
                            href="/tracker/session"
                        />
                    }
                    {session.role==="user" &&
                        <AlertWrapper
                            trigger={
                                <DashboardNavCard
                                    title="Start Session"
                                    Icon={Database}
                                    desc="Start a new tracking session."
                                />
                            }
                            title="Start New Session?"
                            confirmText="Start Session"
                            description={`${session?.stationData ? 'Your current session will be deleted.\n' : ''}Are you sure you want to start a new session?`}
                            action="/api/tracker/new"
                            method="POST"
                        />
                    }
                    <DashboardNavCard
                        title="Session History"
                        Icon={Eye}
                        desc="View previous work sessions."
                        href="/tracker/viewer"
                    />
                </div>

            </main>

            <Footer name={session.username} />
        </div>
    )
}

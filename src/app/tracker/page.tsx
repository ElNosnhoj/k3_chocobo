'use client'
/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ChocoboLoading from "@/components/ui/chocobo-loading";
import { useAuthSession } from "@/hooks/use-auth";
import { useStationSession } from "@/hooks/use-station";
import DashboardNavCard from "@/components/ui/dashboard-nav-card";
import AlertWrapper from "@/components/ui/alert-wrapper/client";
import { Database, DatabaseZap, Eye } from "lucide-react";
import { useRouter } from "next/navigation";


export default () => {
    const { authSession, isAuthLoading } = useAuthSession()
    const { stationSession, isStationLoading, resetStation, isStationResetting } = useStationSession()
    const router = useRouter()
    const handleStart = async () => {
        await resetStation()
        router.push('/tracker/session')
    }
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="relative flex-grow flex-1 p-6 mx-auto w-full max-w-screen-md">
                {(isAuthLoading || isStationLoading || isStationResetting) ? <ChocoboLoading /> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {stationSession?.stationName &&
                            <DashboardNavCard
                                title="Continue Session"
                                Icon={DatabaseZap}
                                desc="Continue your currently running session"
                                href="/tracker/session"
                            />
                        }
                        {authSession?.role === "user" &&
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
                                description={`${stationSession?.stationName ? 'Your current session will be deleted.\n' : ''}Are you sure you want to start a new session?`}
                                onConfirm={handleStart}
                            // action="/api/tracker/new"
                            // method="POST"
                            />
                        }
                        <DashboardNavCard
                            title="Session History"
                            Icon={Eye}
                            desc="View previous work sessions."
                            href="/tracker/viewer"
                        />
                    </div>
                }
            </main>
            <Footer name={authSession?.username} />
        </div>
    )
}
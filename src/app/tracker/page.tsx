'use client'
/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import ChocoboLoading from "@/components/ui/chocobo-loading";
import { useAuthSession } from "@/hooks/use-auth";
import { useStationSession } from "@/hooks/use-station";
import DashboardNavCard from "@/components/ui/dashboard-nav-card";
import AlertWrapper from "@/components/ui/alert-wrapper/client";
import { Database, DatabaseZap, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/ui/page-wrapper/client";
import React from "react";

export default () => {
    const { authSession, isAuthLoading } = useAuthSession()
    const { stationSession, isStationLoading, resetStation, isStationResetting, isStationValidating } = useStationSession()
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const handleStart = async () => {
        setLoading(true)
        await resetStation()
        router.push('/tracker/session')
    }

    return (
        <PageWrapper>
            {(isAuthLoading || isStationLoading || isStationResetting || loading) ? <ChocoboLoading /> :
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
        </PageWrapper>
    )
}
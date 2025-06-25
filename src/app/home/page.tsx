/**=====================================================================
 * file: home/page.tsx
 * desc: dashboard user sees on login
 *=====================================================================*/
import { getAuthSessionData } from "@/lib/session/auth-session";
import { Activity, Sparkle } from "lucide-react";
import DashboardNavCard from "@/components/ui/dashboard-nav-card";
import PageWrapper from "@/components/ui/page-wrapper/server";

export default async () => {
    const authSession = await getAuthSessionData()
    return (
        <PageWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr" >
                {false &&
                    <DashboardNavCard
                        title="Template"
                        desc="This is some dummy button to nav to different pages. All hail chocogods."
                    />
                }
                {authSession.role === "admin" &&
                    <DashboardNavCard
                        title="Admin Card!"
                        desc="You'll see this if you're an admin. All hail chocogods."
                    />
                }
                <DashboardNavCard
                    title="Session Tracker"
                    Icon={Activity} // Replace with appropriate icon if needed
                    desc="Track data for your machines, including fabricated parts, defects, and issues."
                    href="/tracker"
                />
                {authSession.role === "admin" &&
                    <DashboardNavCard
                        title="OEESS"
                        Icon={Sparkle}
                        desc="View station operational effeciency at a glance."
                    />
                }
            </div>
        </PageWrapper>

    )
}

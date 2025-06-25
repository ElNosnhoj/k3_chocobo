'use client'
/**=====================================================================
 * file: viewer/page.tsx
 * desc: view past sessions
 *=====================================================================*/
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useAuthSession } from "@/hooks/use-auth";
import ChocoboLoading from "@/components/ui/chocobo-loading";
import { useStationDB } from "@/hooks/use-station-db";
import EntriesOverview from "./entries-overview";
import PageWrapper from "@/components/ui/page-wrapper";

export default () => {
    const { authSession, isAuthLoading } = useAuthSession()
    const { stationDbEntries: entries, isStationDbEntriesLoading } = useStationDB()
    return (
        <PageWrapper>
            {(isAuthLoading || isStationDbEntriesLoading) ? <ChocoboLoading /> :
                <>
                    <h2 className="text-xl font-semibold">Session Entries</h2>
                    <p className="text-muted-foreground text-sm whitespace-pre-line mb-4">List of entries in the last week sorted by entry time.</p>
                    {/* page viewer */}
                    {(!entries.length)
                        ? <p>no entries in the last week</p>
                        : <EntriesOverview entries={entries} />
                    }
                </>
            }
        </PageWrapper>
    )
}




/**=====================================================================
 * file: viewer/page.tsx
 * desc: view past sessions
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { db } from "@/lib/drizzle/db";
import { sessionEntries } from "@/lib/drizzle/schema";
import { eq, and, gt } from "drizzle-orm";
import EntriesOverview from "./entries-overview";


export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')

    const lastweek = new Date()
    lastweek.setDate(lastweek.getDate() - 7)

    const entries = await db.select()
        .from(sessionEntries)
        .where(and(
            eq(sessionEntries.userId, session.userId),
            gt(sessionEntries.datetimeStart, lastweek)
        ))
        .orderBy(sessionEntries.datetimeStart)

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                {/* page viewer */}
                {(!entries.length)
                    ? <p>no entries in the last week</p>
                    : <EntriesOverview entries={entries} />
                }
            </main>
            <Footer name={session.username} />
        </div>
    )
}




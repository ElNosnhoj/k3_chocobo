/**=====================================================================
 * file: viewer/page.tsx
 * desc: view past sessions
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { db } from "@/lib/drizzle/db";
import { sessionEntries, users } from "@/lib/drizzle/schema";
import { eq, and, gt, desc } from "drizzle-orm"; // Import desc
import { InferSelectModel } from "drizzle-orm";
import EntriesOverview from "./entries-overview";


export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')

    const lastweek = new Date()
    lastweek.setDate(lastweek.getDate() - 7)

    const entries = await db.select({
        id: sessionEntries.id,
        userId: sessionEntries.userId,
        createdAt: sessionEntries.createdAt,
        stationName: sessionEntries.stationName,
        datetimeStart: sessionEntries.datetimeStart,
        datetimeEnd: sessionEntries.datetimeEnd,
        fabricatedQty: sessionEntries.fabricatedQty,
        changeoverQty: sessionEntries.changeoverQty,
        linechangeQty: sessionEntries.linechangeQty,
        issueDuration: sessionEntries.issueDuration,
        issueNotes: sessionEntries.issueNotes,
        defectQty: sessionEntries.defectQty,
        defectNotes: sessionEntries.defectNotes,
        ...(session.role === 'admin' && { username: users.username }),
    })
        .from(sessionEntries)
        .leftJoin(users, eq(sessionEntries.userId, users.id))
        .where(and(
            session.role !== 'admin' ? eq(sessionEntries.userId, session.userId) : undefined,
            gt(sessionEntries.datetimeStart, lastweek)
        ))
        .orderBy(desc(sessionEntries.createdAt))

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                <h2 className="text-xl font-semibold">Session Entries</h2>
                <p className="text-muted-foreground text-sm whitespace-pre-line mb-4">List of entries in the last week sorted by entry time.</p>
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




import { NextRequest } from "next/server";
import { db } from "@/lib/drizzle/db";
import { sessionEntries } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { SessionEntryProp } from "@/lib/drizzle/schema";

export const POST = async (req: NextRequest) => {
    try {
        const updatedEntry = await req.json() as SessionEntryProp;

        if (!updatedEntry || !updatedEntry.id) {
            return new Response("Invalid entry data or missing ID", { status: 400 });
        }

        const result = await db.update(sessionEntries)
            .set({
                stationName: updatedEntry.stationName,
                datetimeStart: new Date(updatedEntry.datetimeStart),
                datetimeEnd: new Date(updatedEntry.datetimeEnd),
                fabricatedQty: updatedEntry.fabricatedQty,
                changeoverQty: updatedEntry.changeoverQty,
                linechangeQty: updatedEntry.linechangeQty,
                issueDuration: updatedEntry.issueDuration,
                issueNotes: updatedEntry.issueNotes,
                defectQty: updatedEntry.defectQty,
                defectNotes: updatedEntry.defectNotes,
            })
            .where(eq(sessionEntries.id, updatedEntry.id));

        console.log("Update result:", result);

        return new Response("Entry updated successfully", { status: 200 });

    } catch (error) {
        console.error("Error updating entry:", error);
        return new Response("Failed to update entry", { status: 500 });
    }
};
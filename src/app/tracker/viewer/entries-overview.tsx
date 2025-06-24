'use client'
import React from "react";
import { SessionEntryProp } from "@/lib/drizzle/schema";
import EntryEditorSheet from "./entry-editor-sheet";
import EntryItem from "./entry-item";
import { Accordion } from "@/components/ui/accordion";
import ChocoboLoading from "@/components/ui/chocobo-loading";
import { useStationDB } from "@/hooks/use-station-db";


const EntriesOverview = ({ entries }: { entries: SessionEntryProp[] }) => {
    const { patchSessionDb, isPatchSessionDbLoading, isStationDbEntriesValidating } = useStationDB()
    const [open, setOpen] = React.useState(false)
    const selectedRef = React.useRef<SessionEntryProp>(entries[0])

    const handleEdit = (entry: SessionEntryProp) => {
        selectedRef.current = entry
        setOpen(true)
    }
    const handleEditExit = () => setOpen(false)
    const handleEditSave = async (entry: SessionEntryProp) => {
        try {
            await patchSessionDb(entry)
            console.log("Entry updated successfully!")
            setOpen(false) // Close the sheet
        } catch (error) {
            console.error("Error during update:", error)
            // Handle error, e.g., show a toast notification
        }
    }

    return (
        <div className="">
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                <div className="space-y-2">{
                    entries.map((entry, i) => <EntryItem key={entry.id} entry={entry} onEdit={handleEdit} />)
                }</div>
            </Accordion>

            <EntryEditorSheet
                open={open}
                entry={selectedRef.current}
                onEditSave={handleEditSave}
                onEditExit={handleEditExit}
            />
            {(isPatchSessionDbLoading || isStationDbEntriesValidating) && <ChocoboLoading className="fixed inset-0 z-100 bg-white/80 h-screen w-screen" msg="Saving ..." />}
        </div>
    )
}


export default EntriesOverview
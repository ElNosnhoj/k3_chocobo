'use client'
import React from "react";
import { SessionEntryProp } from "@/lib/drizzle/schema";
import EntryEditorSheet from "./entry-editor-sheet";
import EntryItem from "./entry-item";
import { useRouter } from "next/navigation"; // Import useRouter
import { Accordion } from "@/components/ui/accordion";
import ChocoboLoading from "@/components/ui/chocobo-loading";


const EntriesOverview = ({ entries }: { entries: SessionEntryProp[] }) => {
    const [open, setOpen] = React.useState(false)
    const selectedRef = React.useRef<SessionEntryProp>(entries[0])
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleEdit = (entry: SessionEntryProp) => {
        selectedRef.current = entry
        setOpen(true)
    }
    const handleEditExit = () => setOpen(false)
    const handleEditSave = async (entry: SessionEntryProp) => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/tracker/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entry),
            })

            if (response.ok) {
                console.log("Entry updated successfully!")
                setOpen(false) // Close the sheet
                router.refresh() // Refresh the page to re-fetch data
            } else {
                console.error("Failed to update entry:", response.statusText);
                // Handle error, e.g., show a toast notification
            }
        } catch (error) {
            console.error("Error during update:", error)
            // Handle network error
        } finally {
            setIsLoading(false)
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
            {isLoading && <ChocoboLoading className="fixed inset-0 z-100 bg-white/80 h-screen w-screen" msg="Saving ..." />}
        </div>
    )
}


export default EntriesOverview
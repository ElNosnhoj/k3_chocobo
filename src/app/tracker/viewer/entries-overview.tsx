'use client'
import { Card } from "@/components/ui/card";
import { SessionEntryProp } from "@/lib/drizzle/schema";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Close } from "@radix-ui/react-dialog";
import StationSelector from "@/components/ui/station-selector";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation"; // Import useRouter

// Removed db, sessionEntries, eq, and, gt imports as they are not used in this client component
// import { db } from "@/lib/drizzle/db";
// import { sessionEntries } from "@/lib/drizzle/schema";
// import { eq, and, gt } from "drizzle-orm";

const AccordionItemWrapper = ({ value, trigger, content }: { value: string, trigger: React.ReactNode, content: React.ReactNode }) => {
    return (
        <Card className="px-2 py-0">
            <AccordionItem value={value}>
                <AccordionTrigger className="hover:no-underline hover:text-primary/70">
                    {trigger}
                </AccordionTrigger>
                <AccordionContent>
                    {content}
                </AccordionContent>
            </AccordionItem>
        </Card>
    )
}

const Entry = ({ entry, onEdit = (entry) => { } }: { entry: SessionEntryProp, onEdit?: (entry: SessionEntryProp) => void }) => {
    return (
        <AccordionItemWrapper
            value={entry.id}
            trigger={
                <div className="px-2">
                    <div className="text-2xl">{entry.stationName}</div>
                    <div className="text-xs font-normal">{entry.datetimeStart.toLocaleString()}</div>
                </div>
            }
            content={
                <div className="w-full border-t-[1px] pt-2 px-2">
                    <p><strong>Station:</strong> {entry.stationName}</p>
                    <p><strong>Start:</strong> {new Date(entry.datetimeStart).toLocaleString()}</p>
                    <p><strong>End:</strong> {new Date(entry.datetimeEnd).toLocaleString()}</p>
                    <p><strong>Fabricated Qty:</strong> {entry.fabricatedQty}</p>
                    {
                        (entry.issueDuration > 0 &&
                            <>
                                <br />
                                <p><strong>Stop Duration:</strong> {entry.issueDuration} min</p>
                                <p><strong>Stop Notes:</strong> {entry.issueNotes}</p>
                            </>
                        )
                    }
                    {
                        (entry.defectQty > 0 &&
                            <>
                                <br />
                                <p><strong>Defects Qty:</strong> {entry.defectQty}</p>
                                <p><strong>Defect Notes:</strong> {entry.defectNotes}</p>
                            </>
                        )
                    }
                    <Button className="w-full mt-4" onClick={() => onEdit(entry)}>Edit</Button>
                </div>
            }
        />
    )
}



const EntriesOverview = ({ entries }: { entries: SessionEntryProp[] }) => {
    const [open, setOpen] = React.useState(false)
    const [selectedEntry, setSelectedEntry] = React.useState<SessionEntryProp>(entries[0])
    const [sheetEntry, setSheetEntry] = React.useState<SessionEntryProp>(entries[0])

    const handleEdit = (entry: SessionEntryProp) => {
        setSelectedEntry(entry)
        setSheetEntry(entry)
        setOpen(true)
    }
    const handleEditClose = () => setOpen(false)

    const router = useRouter(); // Get router instance

    const handleEditSave = async () => {
        try {
            const response = await fetch("/api/tracker/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sheetEntry),
            })

            if (response.ok) {
                console.log("Entry updated successfully!");
                setOpen(false) // Close the sheet
                router.refresh() // Refresh the page to re-fetch data
            } else {
                console.error("Failed to update entry:", response.statusText);
                // Handle error, e.g., show a toast notification
            }
        } catch (error) {
            console.error("Error during update:", error);
            // Handle network error
        }
    };

    const updateSheetEntry = <K extends keyof SessionEntryProp>(key: K, val: SessionEntryProp[K]) => {
        setSheetEntry(old => ({ ...old, [key]: val }))
    }

    function setDate(date: Date | undefined) {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Session Entries</h2>
            <Accordion
                type="single"
                collapsible
                className="w-full"
            // onValueChange={handleSelected}
            >
                <div className="space-y-2">{
                    entries.map((entry, i) => <Entry key={entry.id} entry={entry} onEdit={handleEdit} />)
                }</div>
            </Accordion>

            <Sheet open={open}>
                <SheetContent className="[&>button]:hidden" onSubmit={e => console.log('asdas?')}>
                    <SheetHeader>
                        <SheetTitle>Edit Entry</SheetTitle>
                        <SheetDescription className="whitespace-pre-line">
                            {"Make changes to the entry here. \nClick save when you're done."}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 px-4" >
                        {/* <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="date">Start Date</Label>
                                <Input id="date" readOnly value={sheetEntry.datetimeStart.toLocaleDateString()} className="text-muted-foreground cursor-default  pointer-events-none" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="time">Start Time</Label>
                                <Input id="time" readOnly value={sheetEntry.datetimeStart.toLocaleTimeString()} className="text-muted-foreground cursor-default  pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="date">Stop Date</Label>
                                <Input id="date" readOnly value={sheetEntry.datetimeEnd.toLocaleDateString()} className="text-muted-foreground cursor-default  pointer-events-none" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="time">Stop Time</Label>
                                <Input id="time" readOnly value={sheetEntry.datetimeEnd.toLocaleTimeString()} className="text-muted-foreground cursor-default  pointer-events-none" />
                            </div>
                        </div> */}

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="station-name">Station</Label>
                            <StationSelector key="station-name" station={sheetEntry.stationName} onStationChange={n => updateSheetEntry("stationName", n)} className="w-full" />
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="fabricated">Fabricated QTY</Label>
                                <Input id="fabricated" type="number" value={sheetEntry.fabricatedQty} onChange={(e) => updateSheetEntry("fabricatedQty", Number(e.target.value))} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="fabricated">Defects QTY</Label>
                                <Input id="fabricated" type="number" value={sheetEntry.defectQty} onChange={(e) => updateSheetEntry("defectQty", Number(e.target.value))} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Defect Notes</Label>
                            <Textarea
                                className="min-h-[6rem] max-h-[6rem]"
                                placeholder="notes..."
                                value={sheetEntry.defectNotes || ''}
                                onChange={(e) => updateSheetEntry("defectNotes", e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="fabricated">Change Over QTY</Label>
                                <Input id="fabricated" type="number" value={sheetEntry.changeoverQty} onChange={(e) => updateSheetEntry("changeoverQty", Number(e.target.value))} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label htmlFor="fabricated">Line Change QTY</Label>
                                <Input id="fabricated" type="number" value={sheetEntry.linechangeQty} onChange={(e) => updateSheetEntry("linechangeQty", Number(e.target.value))} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Stops Duration (m)</Label>
                            <Input id="fabricated" type="number" value={sheetEntry.issueDuration} onChange={(e) => updateSheetEntry("issueDuration", Number(e.target.value))} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Issue/Stop Notes</Label>
                            <Textarea
                                className="min-h-[6rem] max-h-[6rem]"
                                placeholder="notes..."
                                value={sheetEntry.issueNotes || ''}
                                onChange={(e) => updateSheetEntry("issueNotes", e.target.value)}
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={handleEditSave}>Save</Button>
                        <Button variant="outline" onClick={handleEditClose}>Cancel</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}


interface DateSelectorProps {
    date?: Date,
    onDateChange?: (date: Date) => void
}

const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
    const [open, setOpen] = React.useState(false)

    const handleDateChange = (__date: Date | undefined) => {
        if (!__date) return
        const temp = date ? new Date(date) : new Date()
        temp.setFullYear(__date.getFullYear())
        temp.setMonth(__date.getMonth())
        temp.setDate(__date.getDate())
        onDateChange && onDateChange(temp)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    id="date"
                    className="w-full justify-between font-normal"
                >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={handleDateChange}
                />
            </PopoverContent>
        </Popover>
    )
}

export default EntriesOverview
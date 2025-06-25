import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import StationSelector from "@/components/ui/station-selector"
import { Textarea } from "@/components/ui/textarea"
import { SessionEntryProp } from "@/lib/drizzle/schema"
import React from "react"


interface EntryEdiotrSheetProps {
    open: boolean
    entry: SessionEntryProp
    onEditSave: (entry: SessionEntryProp) => void
    onEditExit?: () => void
}



const EntryEditorSheet = ({ open, entry, onEditSave, onEditExit }: EntryEdiotrSheetProps) => {
    const [sheetEntry, setSheetEntry] = React.useState(entry)

    const updateSheetEntry = <K extends keyof SessionEntryProp>(key: K, val: SessionEntryProp[K]) => {
        setSheetEntry(old => ({ ...old, [key]: val }))
    }

    return (
        <Sheet open={open}>
            <SheetContent className="[&>button]:hidden" onSubmit={e => console.log('asdas?')}>
                <SheetHeader>
                    <SheetTitle>Edit Entry</SheetTitle>
                    <SheetDescription className="whitespace-pre-line">
                        {"Make changes to the entry here. \nClick save when you're done."}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 px-4" >
                    {
                        sheetEntry.username && 
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={sheetEntry.username} readOnly className="bg-gray-100 text-gray-700 cursor-not-allowed" />
                        </div>
                    }
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="station-name">Station</Label>
                        <StationSelector key="station-name" station={sheetEntry.stationName} onStationChange={n => updateSheetEntry("stationName", n)} className="w-full" />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Fabricated QTY</Label>
                            <Input id="fabricated" type="number" min={1} value={sheetEntry.fabricatedQty} onChange={(e) => updateSheetEntry("fabricatedQty", Number(e.target.value))} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Defects QTY</Label>
                            <Input id="fabricated" type="number" min={0} value={sheetEntry.defectQty} onChange={(e) => updateSheetEntry("defectQty", Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="fabricated">Defect Notes</Label>
                        <Textarea
                            className="min-h-[6rem] max-h-[6rem]"
                            maxLength={255}
                            placeholder="notes..."
                            value={sheetEntry.defectNotes || ''}
                            onChange={(e) => updateSheetEntry("defectNotes", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Change Over QTY</Label>
                            <Input id="fabricated" type="number" min={0} value={sheetEntry.changeoverQty} onChange={(e) => updateSheetEntry("changeoverQty", Number(e.target.value))} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fabricated">Line Change QTY</Label>
                            <Input id="fabricated" type="number" min={0} value={sheetEntry.linechangeQty} onChange={(e) => updateSheetEntry("linechangeQty", Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="fabricated">Stops Duration (m)</Label>
                        <Input id="fabricated" type="number" min={0} value={sheetEntry.issueDuration} onChange={(e) => updateSheetEntry("issueDuration", Number(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="fabricated">Issue/Stop Notes</Label>
                        <Textarea
                            className="min-h-[6rem] max-h-[6rem]"
                            maxLength={255}
                            placeholder="notes..."
                            value={sheetEntry.issueNotes || ''}
                            onChange={(e) => updateSheetEntry("issueNotes", e.target.value)}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={() => onEditSave(sheetEntry)}>Save</Button>
                    <Button variant="outline" onClick={onEditExit}>Cancel</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}


export default EntryEditorSheet
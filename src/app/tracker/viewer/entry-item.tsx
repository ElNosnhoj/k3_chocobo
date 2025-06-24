import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SessionEntryProp } from "@/lib/drizzle/schema"

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

const EntryItem = ({ entry, onEdit = (entry) => { } }: { entry: SessionEntryProp, onEdit?: (entry: SessionEntryProp) => void }) => {
    return (
        <AccordionItemWrapper
            value={entry.id}
            trigger={
                <div className="px-2">
                    <div className="text-2xl">{entry.stationName}</div>
                    <div className="text-xs font-normal">{new Date(entry.datetimeStart).toLocaleString()}</div>
                    {entry.username&&<p className="text-xs font-normal">{entry.username}</p>}
                </div>
            }
            content={
                <div className="w-full border-t-[1px] pt-2 px-2">
                    {entry.username&&<p><strong>User:</strong> {entry.username}</p>}
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

export default EntryItem
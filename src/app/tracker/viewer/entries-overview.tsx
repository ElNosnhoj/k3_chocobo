import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SessionEntryProp } from "@/lib/drizzle/schema";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

const AccordionItemWrapper = ({ value, trigger, content }: { value: string, trigger: React.ReactNode, content: React.ReactNode }) => {
    return (
        <Card className="px-2 py-0">
            <AccordionItem value={value}>
                <AccordionTrigger>
                    {trigger}
                </AccordionTrigger>
                <AccordionContent>
                    {content}
                </AccordionContent>
            </AccordionItem>
        </Card>
    )
}

const Entry = ({ entry }: { entry: SessionEntryProp }) => {
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
                    <Button className="w-full mt-4">Edit</Button>
                </div>
            }
        />
    )
}

const EntriesOverview = ({ entries }: { entries: SessionEntryProp[] }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Session Entries</h2>
            <Accordion
                type="single"
                collapsible
                className="w-full"
            >
                <div className="space-y-2">{entries.map((entry) => <Entry key={entry.id} entry={entry} />)}</div>

            </Accordion>
        </div>
    )
}
export default EntriesOverview
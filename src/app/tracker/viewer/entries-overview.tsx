import { Card, CardContent  } from "@/components/ui/card";
import { SessionEntryProp } from "@/lib/drizzle/schema";


const EntriesOverview = ({ entries }: {entries:SessionEntryProp[]}) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Session Entries</h2>
            {entries.length === 0 ? (
                <p>No entries to display.</p>
            ) : (
                <div className="grid gap-2">
                    {entries.map((entry) => (
                        <Card key={entry.id} className="shadow-sm m-0 px-4 py-2">
                            <CardContent className="p-0 m-0 b-0">
                                <p><strong>Station:</strong> {entry.stationName}</p>
                                <p><strong>Start:</strong> {new Date(entry.datetimeStart).toLocaleString()}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
export default EntriesOverview;
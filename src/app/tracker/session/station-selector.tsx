/**=====================================================================
 * file: tracker/session/station-selector.tsx
 * desc: choose stations
 *=====================================================================*/
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const stationOptions = [
    "Laser Cutting",
    "Press Brake",
    "PEM System"
]

const StationSelector = ({ station, onStationChange }: { station: string, onStationChange: (s: string) => void }) => {
    return (
        <Select onValueChange={s => onStationChange(s)} value={station} >
            <SelectTrigger className="w-[12em] self-center">
                <SelectValue placeholder="Select Station" />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectLabel className="text-center">-- Select Station --</SelectLabel>
                    {stationOptions.map((s, _) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}


export default StationSelector
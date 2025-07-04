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
import React from "react"


export const stationOptions = [
    "Laser Cutting",
    "Press Brake",
    "PEM System"
]

interface StationSelectorProps {
    station?: string,
    onStationChange?: (s:string)=>void
    className?: string
}

const StationSelector = ({ station, onStationChange, className}: StationSelectorProps) => {
    const [val, setVal] = React.useState<undefined|string>(undefined)
    const handleValueChange = (s:string)=>{
        setVal(s)
        onStationChange&&onStationChange(s)
    }
    return (
        <Select onValueChange={handleValueChange} value={val!=undefined?val:''}>
            <SelectTrigger className={`w-[12em] self-center ${className}`}>
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { monthNames } from "@/lib/constants";
import React from "react";


interface MonthSelector {
    month?: number
    onMonthChange?: (m: any) => void
    monthFilter?: number[]
    className?: string
}
export const MonthSelector = ({ month, onMonthChange, monthFilter, className }: MonthSelector) => {
    const options = monthFilter ? monthFilter.map(val => monthNames[val]) : monthNames
    const [val, setVal] = React.useState<undefined | number>(undefined)

    React.useEffect(() => {
        setVal(month)
    }, [month])

    const handleOnValueChange = (s: string) => {
        const index = monthNames.indexOf(s)
        setVal(index)
        onMonthChange && onMonthChange(index)
    }
    return (
        <Select onValueChange={handleOnValueChange} value={val != undefined ? monthNames[val] : ''}>
            <SelectTrigger className={`w-[12em] self-center ${className}`}>
                <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectLabel className="text-center">-- Select Month --</SelectLabel>
                    {options.map((s, _) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
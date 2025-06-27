
'use client'
import PageWrapper from "@/components/ui/page-wrapper/client";
import StationSelector, { stationOptions } from "@/components/ui/station-selector";
import React from "react";
import { getAvailableMonthsFromLastYear, getMonthStationData } from "./actions";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SessionEntryProp } from "@/lib/drizzle/schema";



const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const MonthSelector = () => {

}

export default () => {
    const [stationName, setStationName] = React.useState<string>('Press Brake')
    const [monthOptions, setMonthOptions] = React.useState<string[]>(['June'])
    const [month, setMonth] = React.useState('')
    const [data, setData] = React.useState<SessionEntryProp[]>([])

    const lastyear = new Date()
    lastyear.setFullYear(lastyear.getFullYear() - 1)

    React.useEffect(() => { setMonth('June') }, [stationName])
    const updateData = async () => {
        const index = monthNames.findIndex(m => m === month)
        const res = await getMonthStationData(stationName, index)
        setData(data)
        console.log(res)
    }
    React.useEffect(() => {
        if (month) updateData()
    }, [month])

    const handleStationChange = async (s: typeof stationOptions[number]) => {
        setStationName(s)
        const monthNums = await getAvailableMonthsFromLastYear(s)
        const temp = monthNums.map((val) => monthNames[val])
        setMonthOptions(temp)
    }



    return (
        <PageWrapper>
            {/* <div>hello</div> */}
            <h2 className="text-xl font-semibold">OEESS</h2>
            <p className="text-muted-foreground text-sm whitespace-pre-line mb-4">Whatever that means</p>
            <StationSelector station={stationName} onStationChange={handleStationChange} />

            {(stationName && monthOptions) &&
                <Select onValueChange={s => setMonth(s)} value={month}>
                    <SelectTrigger className={`w-[12em] self-center`}>
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel className="text-center">-- Select Month --</SelectLabel>
                            {monthOptions.map((s, _) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            }
        </PageWrapper>
    )
}


// flex flex-col items-center p-6 mx-auto w-full max-w-screen-md bg-blue-100 m-1

'use client'
import PageWrapper from "@/components/ui/page-wrapper/client";
import StationSelector, { stationOptions } from "@/components/ui/station-selector";
import React from "react";
import { getAvailableMonthsFromLastYear, getMonthStationData } from "./actions";
import { monthNames } from "@/lib/constants";
import { SessionEntryProp } from "@/lib/drizzle/schema";
import { MonthSelector } from "./month-selector";
import ChocoboLoading from "@/components/ui/chocobo-loading";
import { toast } from "sonner";


export default () => {
    const [loading, setLoading] = React.useState(false)
    const [stationName, setStationName] = React.useState<string>('Press Brake')
    const [data, setData] = React.useState<any[]>([])
    const [monthFilter, setMonthFilter] = React.useState<number[]>([])

    const handleStationChange = async (s: typeof stationOptions[number]) => {
        setLoading(true)
        try {
            const months = (await getAvailableMonthsFromLastYear(s))
            if (months.length < 1) toast.info(`${s} has no data in the last year`)
            else setMonthFilter(months)
        }
        catch {
            toast.error("Something went wrong")
        }
        setStationName(s)
        setLoading(false)
    }
    const handleMonthChange = async (m: number) => {
        setLoading(true)
        try {
            const res = (await getMonthStationData(stationName, m))
            if (res.length < 1) toast.info(`No data found`)
            else setData(res)
        }
        catch {
            toast.error("Something went wrong")
        }
        setLoading(false)
    }
    React.useEffect(()=>{
        handleMonthChange(5)
    },[])

    return (
        <PageWrapper>
            <h2 className="text-xl font-semibold">OEESS</h2>
            <p className="text-muted-foreground text-sm whitespace-pre-line mb-4">Whatever that means</p>

            <StationSelector onStationChange={handleStationChange} />
            {(monthFilter.length > 0) &&
                <MonthSelector monthFilter={monthFilter} onMonthChange={handleMonthChange} />
            }

            {loading && <ChocoboLoading className="bg-white/66" msg="checking..." />}
        </PageWrapper>
    )
}


// flex flex-col items-center p-6 mx-auto w-full max-w-screen-md bg-blue-100 m-1
'use client';
/**=====================================================================
 * file: tracker/session/tracker.tsx
 * desc: view data for station
 *=====================================================================*/
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { defaultStationData, StationData, SessionData } from "@/lib/session/data-interface";

import { Calendar, Clock, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

import useSession from "@/lib/session/use-session";
import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import StationSelector from "./station-selector";
import CheckCard from "./check-card";
import NumberFlow from '@number-flow/react'
import NumberField from "./number-field";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const TestingView = ({ data }: { data: StationData | undefined }) => {
    if (!data) return <></>
    return (
        <div className="w-full break-words">
            {
                Object.entries(data).map(([key, value]) => (
                    <div key={key} className="text-sm">
                        <span className="font-semibold">{key}</span>: {String(value)}
                    </div>
                ))
            }
        </div>
    )
}


const FabricatedQty = ({ qty, onQtyChange }: { qty: number, onQtyChange: (val: number) => void }) => {
    return (
        <Card className="w-full shadow-sm border-0 gap-0 m-0 p-0 pb-4">
            <CardHeader className="flex item-center justify-center p-4 border-b-[1px] text-2xl">
                <CardTitle>Fabricated QTY</CardTitle>
            </CardHeader>
            <CardContent className=" flex items-center justify-center">
                <NumberField
                    value={qty}
                    onValueChange={onQtyChange}
                    title="Edit Fabricated Quantity"
                    description="Enter the new fabricated quantity below."
                />
            </CardContent>
        </Card>
    )
}


const Station = () => {
    // flex flex-col items-center w-full max-w-screen-md py-4 bg-red-100
    const [data, setData] = React.useState<StationData>(defaultStationData)
    const { session, isLoading, updateStation } = useSession()
    const dataRef = useRef(data);
    const sessionRef = useRef(session);

    React.useEffect(() => {
        dataRef.current = data;
        sessionRef.current = session;
    }, [data, session]);

    const updateStationHandler = async (event: BeforeUnloadEvent | undefined = undefined) => {
        if (JSON.stringify(sessionRef.current?.stationData) !== JSON.stringify(dataRef.current)) {
            const msg = await updateStation(dataRef.current)
            console.log(msg)
        }
    }

    React.useEffect(() => {
        if (isLoading) return
        session?.stationData && setData(session.stationData)
        const intervalID = setInterval(updateStationHandler, 30000)
        window.addEventListener('beforeunload', updateStationHandler)
        return () => {
            clearInterval(intervalID)
            window.removeEventListener('beforeunload', updateStationHandler)
        }
    }, [isLoading])


    const test = async () => {
        setData(old => ({ ...old, stationName: "" }))
    }

    return (isLoading) ? (
        <div className="flex items-center p-6 mx-auto">
            <p className="text-lg">Loading...</p>
        </div>
    ) : (
        <div className="flex flex-col w-full gap-4 overflow-hidden">
            <StationSelector station={data.stationName} onStationChange={s => setData(old => ({ ...old, stationName: s }))} />

            {/* <div className={`flex flex-col w-full gap-4 overflow-hidden transition-all duration-300 ease-in-out ${data?.stationName ? "opacity-100 " : "opacity-0"}`}> */}
            <div className={`overflow-hidden w-full `}>
                <div className={`flex flex-col gap-4 w-full transition-all duration-700 ease-in-out ${data?.stationName ? "" : "-translate-y-full"}`}>
                    <Card className="w-full shadow-sm border-0 gap-0 m-0 p-0">
                        display start date, start time, and running time in minutes here
                    </Card>

                    {/* FABRICATED QTY */}
                    <FabricatedQty
                        qty={data.fabricatedQty}
                        onQtyChange={v => setData(old => ({ ...old, fabricatedQty: v }))}
                    />

                    {/* CHANGE OVER */}
                    <CheckCard
                        title={"Change Over"}
                        state={data.changeOver}
                        onCheckedChange={(b) => setData(old => ({ ...old, changeOver: b }))}
                    >
                        <div className="flex items-center justify-center pb-4 gap-2 px-4">
                            <Card className="p-0 gap-0 mt-4 items-center pb-2 w-full max-w-48">
                                <div className="text-center text-xl border-b-1 w-full">
                                    Change Over
                                </div>
                                <NumberField
                                    value={data.changeOverQty}
                                    onValueChange={(v) => setData(old=>({...old,changeOverQty:v}))}
                                    title="Change Over Quantity"
                                    description="Enter the new change over quantity below."
                                />
                            </Card>
                            <Card className="p-0 gap-0 mt-4 items-center pb-2 w-full max-w-48">
                                <div className="text-center text-xl border-b-1 w-full">
                                    Line Change
                                </div>
                                <NumberField
                                    value={data.lineChangeQty}
                                    onValueChange={(v) => setData(old=>({...old,lineChangeQty:v}))}
                                    title="Change Over Quantity"
                                    description="Enter the new change over quantity below."
                                />
                            </Card>
                        </div>
                    </CheckCard>

                    <CheckCard
                        title={"Stops"}
                        state={data.issue}
                        onCheckedChange={(b) => setData(old => ({ ...old, issue: b }))}
                    >
                        <div className="w-full flex flex-col p-4">
                            <div className="text-6xl font-bold text-center">
                                30
                            </div>
                            <div className="text-center">minutes</div>
                            <Textarea className="mt-6 min-h-[6rem] max-h-[6rem]" placeholder="notes..." />
                        </div>
                    </CheckCard>

                    <CheckCard
                        title={"Defects"}
                        state={data.defect}
                        onCheckedChange={(b) => setData(old => ({ ...old, defect: b }))}
                    >
                        <div className="w-full flex flex-col p-4">
                            <div className="text-6xl font-bold text-center">
                                30
                            </div>
                            <div className="text-center">amount</div>
                            <Textarea className="mt-6 min-h-[6rem] max-h-[6rem]" placeholder="notes..." />
                        </div>
                    </CheckCard>


                    <Button onClick={test}>ignore</Button>
                    <TestingView data={data} />
                    <TestingView data={session?.stationData} />
                </div>
            </div>
        </div>
    )
}

export default Station


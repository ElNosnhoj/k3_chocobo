'use client';
/**=====================================================================
 * file: tracker/session/tracker.tsx
 * desc: view data for station
 *=====================================================================*/
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { defaultStationData, StationData, SessionData } from "@/lib/session/data-interface";

import { Calendar, Clock, Timer, ThumbsDown, OctagonMinus, Brush, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

import useSession from "@/lib/session/use-session";
import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import StationSelector from "./station-selector";
import CheckCard from "./check-card";
import NumberField, { NumberFieldAlt } from "./number-field";
import NumberDialog from "./number-dialog";
import AlertWrapper from "@/components/ui/alert-wrapper/client";
import ChocoboLoading from "@/components/ui/chocobo-loading";
import RunTimer from "@/components/ui/run-timer";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

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

const MetricCard = ({ Icon, metric, label }: { Icon: React.ElementType, metric: any, label?: string }) => {
    return (
        <Card className="w-fit h-fit shadow-sm gap-0 m-0 p-0">
            <CardContent className="p-2 flex flex-col items-center justify-center">
                <Icon className="w-6 h-6 text-muted-foreground " />
                <div className="text-2xl -mb-2">{metric}</div>
                <p className="text-lg text-muted-foreground ">{label}</p>
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
            // const msg = await updateStation(dataRef.current)
            // console.log(msg)
            updateStation(dataRef.current).then(msg => console.log(msg))
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

    return (isLoading) ? <ChocoboLoading /> : (
        <div className="flex flex-col w-full gap-4 overflow-hidden">
            <StationSelector station={data.stationName} onStationChange={s => setData(old => ({ ...old, stationName: s }))} />

            <RevealWrapper state={data?.stationName ? true : false}>
                <div className="flex flex-col gap-3 w-full">

                    {/* DATETIME RUNNER */}
                    <Card className="w-full shadow-sm border-0 gap-0 m-0 p-0">
                        <CardHeader className="flex item-center justify-center p-4 border-b-[1px] text-2xl">
                            <CardTitle>Session Info</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="flex items-center justify-center gap-3">
                                <MetricCard
                                    Icon={Calendar}
                                    metric={data.datetimeStart ? new Date(data.datetimeStart).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) : "N/A"}
                                    label={"date"}
                                />
                                <MetricCard
                                    Icon={Timer}
                                    metric={<RunTimer startTime={data.datetimeStart} />}
                                    label={"runtime"}
                                />
                                <MetricCard
                                    Icon={Clock}
                                    metric={data.datetimeStart ? new Date(data.datetimeStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : "N/A"}
                                    label={"time"}
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center mb-2">
                                <NumberFieldAlt
                                    value={data.fabricatedQty}
                                    onValueChange={v => setData(old => ({ ...old, fabricatedQty: v }))}
                                    title="Edit Fabricated Quantity"
                                    description="Enter the new fabricated quantity below."
                                />
                                <h1 className="text-xl -mt-4">fabricated</h1>
                            </div>
                        </CardContent>
                    </Card>

                    {/* FABRICATED QTY */}
                    <Card className="w-full shadow-sm border-0 gap-0 m-0 p-0 pb-4 hidden">
                        <CardHeader className="flex item-center justify-center p-4 border-b-[1px] text-2xl">
                            <CardTitle>Fabricated QTY</CardTitle>
                        </CardHeader>
                        <CardContent className=" flex items-center justify-center">
                            <NumberField
                                value={data.fabricatedQty}
                                onValueChange={v => setData(old => ({ ...old, fabricatedQty: v }))}
                                title="Edit Fabricated Quantity"
                                description="Enter the new fabricated quantity below."
                            />
                        </CardContent>
                    </Card>

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
                                    onValueChange={(v) => setData(old => ({ ...old, changeOverQty: v }))}
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
                                    onValueChange={(v) => setData(old => ({ ...old, lineChangeQty: v }))}
                                    title="Line Change Quantity"
                                    description="Enter the new line change quantity below."
                                />
                            </Card>
                        </div>
                    </CheckCard>

                    {/* Issues | Stops */}
                    <CheckCard
                        title={"Stops"}
                        state={data.issue}
                        onCheckedChange={(b) => setData(old => ({ ...old, issue: b }))}
                    >
                        <div className="w-full flex flex-col p-4 pt-0">
                            <NumberDialog
                                value={data.issueDuration}
                                onValueChange={(v) => setData(old => ({ ...old, issueDuration: v }))}
                                title="Stop Duration"
                                description="Enter stop duration in minutes below."
                            />
                            <div className="text-center -mt-4 text-muted-foreground">minutes</div>
                            <Textarea
                                className="mt-6 min-h-[6rem] max-h-[6rem]"
                                placeholder="notes..."
                                value={data.issueNote}
                                onChange={e => setData(old => ({ ...old, issueNote: e.target.value }))}
                            />
                        </div>
                    </CheckCard>

                    {/* Defects */}
                    <CheckCard
                        title={"Defects"}
                        state={data.defect}
                        onCheckedChange={(b) => setData(old => ({ ...old, defect: b }))}
                    >
                        <div className="w-full flex flex-col p-4 pt-0">
                            <NumberDialog
                                value={data.defectQTY}
                                onValueChange={(v) => setData(old => ({ ...old, defectQTY: v }))}
                                title="Stop Duration"
                                description="Enter stop duration in minutes below."
                            />
                            <div className="text-center -mt-4 text-muted-foreground">amount</div>
                            <Textarea
                                className="mt-6 min-h-[6rem] max-h-[6rem]"
                                placeholder="notes..."
                                value={data.defectNote}
                                onChange={e => setData(old => ({ ...old, defectNote: e.target.value }))}
                            />
                        </div>
                    </CheckCard>

                    {/* <Button>End Session</Button> */}
                    <AlertWrapper
                        trigger={<Button className="mt-2">End Session</Button>}
                        title="End Session?"
                        description="Your current session will be logged."
                        onConfirm={()=>console.log("yoyo")}
                    />

                    {/* testing stuff */}
                    <div className="flex flex-col w-full gap-4 hidden">
                        <Button onClick={test}>ignore</Button>
                        <TestingView data={data} />
                        <TestingView data={session?.stationData} />
                    </div>

                </div>
            </RevealWrapper>
        </div>
    )
}

export default Station



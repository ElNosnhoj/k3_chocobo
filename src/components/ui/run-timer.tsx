import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import React from "react";

const RunTimer = ({ startTime }: { startTime: string }) => {
    const [hh, setHH] = React.useState(0)
    const [mm, setMM] = React.useState(0)
    const [ss, setSS] = React.useState(0)

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (startTime) {
            intervalId = setInterval(() => {
                const start = new Date(startTime).getTime()
                const now = new Date().getTime()
                const diff = now - start

                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)

                setHH(hours)
                setMM(minutes)
                setSS(seconds)
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        };
    }, [startTime])

    return (
        <NumberFlowGroup>
            <div
                style={{ fontVariantNumeric: 'tabular-nums' }}
                className="text-3xl flex items-baseline font-semibold"
            >
                <NumberFlow value={hh} format={{ minimumIntegerDigits: 2 }} />
                <NumberFlow
                    prefix=":"
                    value={mm}
                    digits={{ 1: { max: 5 } }}
                    format={{ minimumIntegerDigits: 2 }}
                />
                <NumberFlow
                    prefix=":"
                    value={ss}
                    digits={{ 1: { max: 5 } }}
                    format={{ minimumIntegerDigits: 2 }}
                />
            </div>
        </NumberFlowGroup>
    )
}


export default RunTimer
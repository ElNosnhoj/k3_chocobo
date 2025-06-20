/**=====================================================================
 * file: tracker/session/check-card.tsx
 * desc: checkbox that reveals cardcontent on active
 *=====================================================================*/
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import RevealWrapper from "@/components/ui/reveal-wrapper"

const CheckCard = ({ title = "checkbox", state = false, onCheckedChange = (b: boolean) => { }, children = <></> }) => (
    <Card className="w-full shadow-sm border-0 gap-0 m-0 p-0">
        <CardHeader className="flex p-4 text-2xl w-full">
            <div className="flex items-center space-x-2 w-full">
                <Checkbox id={title} className="size-6" checked={state} onCheckedChange={onCheckedChange} />
                <label
                    htmlFor={title}
                    className=" text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
                >
                    {title}
                </label>
            </div>
        </CardHeader>
        <RevealWrapper state={state} fade={true} speed={"quick"}>
            <CardContent className="overflow-hidden border-t-[1px] p-0">
                {children}
            </CardContent>
        </RevealWrapper>
    </Card>
)
export default CheckCard
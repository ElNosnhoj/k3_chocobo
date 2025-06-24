
/**=====================================================================
 * file: chocobo-loading.tsx
 * desc: animated chocobo loader. **needs chocobo-loading.gif
 *=====================================================================*/
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";


const chocoboVariants = cva(
    "flex flex-col items-center justify-center select-none justify-self-center bg-transparent",
    {
        variants: {
            variant: {
                fit: "w-fit h-fit self-center absolute inset-0 z-2",
                fill: "w-full h-full self-center absolute inset-0 z-2",
                fullscreen: "w-screen h-screen fixed inset-0 z-2 bg-white/66"
            },
            
            size: {
                default: "[&>img]:w-50 text-6xl",
                sm: "[&>img]:w-30 text-4xl",
                xs: "[&>img]:w-20 text-2xl",
                lg: "[&>img]:w-70 text-6xl",
                xl: "[&>img]:w-80 text-6xl",
            }
        },
        defaultVariants: {
            variant: "fill",
            size: "default"
        }
    }
)

import { type VariantProps } from "class-variance-authority";

interface ChocoboLoadingProps extends VariantProps<typeof chocoboVariants> {
    className?: string;
    msg?: string
}

const ChocoboLoading = ({ className, msg="Loading...", variant, size }: ChocoboLoadingProps) => {
    return (
        <div className={cn(chocoboVariants({ variant, size, className }))}>
            <img src="/chocobo-loading.gif" alt="Loading..."/>
            {msg&&<p className="text-inherit">{msg}</p>}
        </div>
    )
}
export default ChocoboLoading
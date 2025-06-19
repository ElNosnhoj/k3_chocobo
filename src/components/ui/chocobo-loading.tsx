
/**=====================================================================
 * file: chocobo-loading.tsx
 * desc: animated chocobo loader. **needs chocobo-loading.gif
 *=====================================================================*/
import { cn } from "@/lib/utils";

interface ChocoboLoadingProps {
    className?: string;
}

const ChocoboLoading = ({ className }: ChocoboLoadingProps) => {
    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center", className)}>
            <img src="/chocobo-loading.gif" alt="Loading..." className="w-50" />
            <p className="text-6xl">Loading...</p>
        </div>
    )
}
export default ChocoboLoading
import { Button } from "@/components/ui/button";
import NumberDialog from "./number-dialog";
interface NumberFieldProps {
    value: number;
    onValueChange: (val: number) => void;
    title: string;
    description: string;
}

const NumberField = ({ value, onValueChange, title, description }: NumberFieldProps) => {
    return (
        <div className="w-fit">
            <NumberDialog 
                value={value}
                onValueChange={onValueChange}
                title={title}
                description={description}
            />
            <div className="flex items-center justify-center gap-4">
                <Button
                    onClick={() => (value > 0 && onValueChange(value - 1))}
                    className="text-lg w-12 h-9"
                    variant={"secondary"}
                >
                    -
                </Button>
                <Button
                    onClick={() => onValueChange(value + 1)}
                    className="text-lg w-12 h-9"
                    variant={"outline"}
                >
                    +
                </Button>
            </div>
        </div>
    )
}

export default NumberField
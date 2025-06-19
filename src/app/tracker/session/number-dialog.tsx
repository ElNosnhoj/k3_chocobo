'use client';

import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NumberFlow from '@number-flow/react';

interface NumberFieldProps {
    value: number;
    onValueChange: (val: number) => void;
    title: string;
    description: string;
}

const NumberDialog = ({ value, onValueChange, title, description }: NumberFieldProps) => {
    const [open, setOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState(value);

    React.useEffect(() => {
        setDialogValue(value);
    }, [value, open]);

    const handleSave = () => {
        onValueChange(dialogValue);
        setOpen(false);
    };

    const handleCancel = () => {
        setDialogValue(value);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="text-6xl font-bold cursor-pointer text-center">
                    <NumberFlow value={value} className="pointer-events-none" aria-hidden="true" format={{ useGrouping: false }} />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] -translate-y-50">
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="">
                    <Input
                        type="number"
                        value={dialogValue}
                        onChange={(e) => setDialogValue(Number(e.target.value))}
                        className="text-center !text-4xl leading-loose p-8 [&::-webkit-inner-spin-button]:appearance-none"

                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NumberDialog
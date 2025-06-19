import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

interface AlertWrapperProps {
    trigger: React.ReactNode;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    action?: string; // Add action prop
    method?: string; // Add method prop
}

const AlertWrapper = ({
    trigger,
    title = "Are you sure?",
    description = "Are you sure you want to continue?",
    cancelText = "Cancel",
    confirmText = "Continue",
    action = "",
    method = "GET"
}: AlertWrapperProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="whitespace-pre-line">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form action={action?action:undefined} method={method}>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            {confirmText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertWrapper

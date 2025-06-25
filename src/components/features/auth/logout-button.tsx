'use client'
import { Button } from "@/components/ui/button"
import AlertWrapper from "@/components/ui/alert-wrapper/client"
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
} from "@/components/ui/alert-dialog"
import { useLogout } from "@/hooks/use-auth"
import ChocoboLoading from "@/components/ui/chocobo-loading"
import { toast } from "sonner"

const LogOutIcon = ({ ...props }) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    )
}

export default () => {
    const { logout, isLogoutLoading } = useLogout()
    return (isLogoutLoading) ? <ChocoboLoading variant={"fullscreen"} /> : (
        <AlertWrapper
            title="Are you sure?"
            description="This action will log you out of your account and clear any current session tracking."
            cancelText="Cancel"
            confirmText="Logout"
            onConfirm={logout}
            trigger={
                <Button variant="outline" className="inline-flex items-center">
                    <LogOutIcon className="h-4 w-4" />
                    <span className="hidden md:inline">Logout</span>
                </Button>
            }
        />
    )
}

'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

import useSession from "@/lib/session/use-session"
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { login } = useSession()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const res = await login(username)
        if (res) router.push('/home')
        else toast.error(`Login failure: username not in the system`)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your provided username
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method="POST" autoComplete="off">
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="john.doe"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <p>Don't have an account?</p>
                                <p>Ask the Chocobo Tamer</p>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

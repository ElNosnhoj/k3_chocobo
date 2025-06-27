'use server'

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { getAuthSessionData } from "@/lib/session/auth-session";
import { redirect } from "next/navigation";
import React from "react";


const PageWrapper = async ({ children }: Readonly<{
    children?: React.ReactNode;
}>) => {
    const authSession = await getAuthSessionData()
    return (
        <div className="flex flex-col min-h-screen bg-background bg-gray-100">
            <Header />
            <main className="relative flex-grow flex-1 p-6 mx-auto w-full max-w-screen-md">
                {children}
            </main>
            <Footer name={authSession.username} />
        </div>
    )
}
export default PageWrapper

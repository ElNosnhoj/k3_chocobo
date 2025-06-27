'use client'
/**=====================================================================
 * file:
 * desc:
 *=====================================================================*/
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useAuthSession } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import React from "react";
import ChocoboLoading from "../chocobo-loading";


const PageWrapper = ({ children }: Readonly<{
    children?: React.ReactNode;
}>) => {
    const { authSession, isAuthLoading} = useAuthSession()
    return (
        <div className="flex flex-col min-h-screen bg-background bg-gray-100">
            <Header />
            <main className="relative flex-grow flex-1 p-6 mx-auto w-full max-w-screen-md">
                {isAuthLoading?<ChocoboLoading />:children}
            </main>
            <Footer name={authSession?.username} />
        </div>
    )
}
export default PageWrapper

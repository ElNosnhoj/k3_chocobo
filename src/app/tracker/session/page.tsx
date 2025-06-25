/**=====================================================================
 * file: tracker/page.tsx
 * desc: session tracker 
 *=====================================================================*/
import { redirect } from "next/navigation";
import { getAuthSessionData } from "@/lib/session/auth-session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Station from "./station";
import PageWrapper from "@/components/ui/page-wrapper";


export default async () => {
    const session = await getAuthSessionData()
    if (!session.isLoggedIn) return redirect('/login')
    return (
        <PageWrapper>
            <Station/>
        </PageWrapper>
    )
}


// flex flex-col items-center p-6 mx-auto w-full max-w-screen-md bg-blue-100 m-1
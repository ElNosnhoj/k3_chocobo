/**=====================================================================
 * file: home/page.tsx
 * desc: dashboard user sees on login
 *=====================================================================*/
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session/session";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 p-6 mx-auto w-full max-w-screen-md">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>This is some dummy button to nav to different pages. All hail chocogods.</p>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Session Tracker</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Start a session tracker! Keep track of fabricated parts, defects, issues. </p>
                    </CardContent>
                </Card>
            </main>

            <Footer name={session.username}/>
        </div>
    )
}

import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

export default async () => {
    const session = await getSessionData()
    if (!session.isLoggedIn) return redirect('/login')


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{ }</h1>
                <LogoutButton />
            </header>
        </div>
    )
}

/**=====================================================================
 * file: components/layout/header.tsx
 * desc: header componenet used for most of the app
 *=====================================================================*/
import { EggFried } from "lucide-react"
import LogoutButton from "@/components/features/auth/logout-button"

export default () => {
    return (
        <header className="bg-white shadow p-6">
            <div className="mx-auto w-full max-w-screen-md flex justify-between items-center">
                <a href="/home" className="flex items-center gap-2">
                    <EggFried />
                    <h1 className="text-2xl font-bold">Chocobo data</h1>
                </a>
                <LogoutButton />
            </div>
        </header>
    )
}

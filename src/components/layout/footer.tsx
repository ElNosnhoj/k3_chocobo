/**=====================================================================
 * file: components/layout/footer.tsx
 * desc: footer componenet used for most of the app
 *=====================================================================*/

import { getSessionData } from "@/lib/session/session";

const Footer = async ({name}:{name?: string}) => {
    const session = await getSessionData()
    return (
        <footer className="bg-gray-200 text-center p-4 text-gray-600 text-sm">
            {name&&<p>Logged in as: {name}</p>}
            <p>&copy; 2023 Chocobo App. All rights reserved.</p>
        </footer>
    )
}

export default Footer;

/**=====================================================================
 * file: session.ts
 * desc: manage user sessions via cookies 
 *=====================================================================*/
import { getIronSession, IronSession, SessionOptions } from "iron-session"
import { cookies } from "next/headers";
import { SessionData } from "./data-interface";

// session cookie info. change to wipe
export const sessionOptions: SessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD ?? 'dummy_complex_password_at_least_32_chars_long',
    cookieName: process.env.IRON_SESSION_COOKIE_NAME ?? 'dummy-app-name',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
        httpOnly: true, // Prevent client-side JS access
        sameSite: 'lax', // Protect against CSRF attacks
    }
}

export const getSessionData = async (): Promise<IronSession<SessionData>>=>{
    return await getIronSession<SessionData>(await cookies(), sessionOptions)
}

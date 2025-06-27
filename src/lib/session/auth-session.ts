/**=====================================================================
 * file: 
 * desc:
 *=====================================================================*/
import { getIronSession, IronSession, SessionOptions } from "iron-session"
import { cookies } from "next/headers";
import { AuthSessionData } from "@/types/auth-types";

const authCookiePassword = process.env.AUTH_SESSION_COOKIE_PASSWORD ?? 'super_secret_auth_cookie_password'
export const authCookieName = process.env.AUTH_SESSION_COOKIE_NAME ?? 'super_secret_auth_cookie_name'

export const authSessionOptions: SessionOptions = {
    password:authCookiePassword,
    cookieName: authCookieName,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
        httpOnly: true, // Prevent client-side JS access
        sameSite: 'lax', // Protect against CSRF attacks
    }
}

export const getAuthSessionData = async (): Promise<IronSession<AuthSessionData>> => {
    return await getIronSession<AuthSessionData>(await cookies(), authSessionOptions)
}

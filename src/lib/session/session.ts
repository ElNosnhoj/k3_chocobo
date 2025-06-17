/**=====================================================================
 * file: session.ts
 * desc: manage user sessions via cookies 
 *=====================================================================*/
import { getIronSession, IronSession, SessionOptions } from "iron-session"
import { cookies } from "next/headers";


// station info
export interface StationData {
    stationName: string
    changeOverQty: number
    fabricatedQty: number
    defectQty: number
    datetimeStart: string
    notes: string
}

// default station tracking data
export const defaultStationData: StationData = {
    stationName: "",
    changeOverQty: 0,
    fabricatedQty: 0,
    defectQty: 0,
    datetimeStart: new Date().toISOString(),
    notes: ""
}

// what to store in session
export interface SessionData {
    username: string
    role: string
    isLoggedIn: boolean
    stationData?: StationData
}

// default session data
export const defaultSessionData: SessionData = {
    username: '',
    role: 'user',
    isLoggedIn: false,
    stationData: defaultStationData
}

// session cookie info. change to wipe
export const sessionOptions: SessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD ?? 'dummy_complex_password_at_least_32_chars_long',
    cookieName: process.env.IRON_SESSION_COOKIE_NAME ?? 'dummy-app-name',
    cookieOptions: {
        secure: true
    }
}


export const getSessionData = async (): Promise<IronSession<SessionData>>=>{
    return await getIronSession<SessionData>(await cookies(), sessionOptions)
}

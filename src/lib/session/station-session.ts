/**=====================================================================
 * file: 
 * desc: 
 *=====================================================================*/
import { getIronSession, IronSession, SessionOptions } from "iron-session"
import { cookies } from "next/headers";
import { StationSessionData, defaultStationSessionData } from "@/types/station-types";

export const stationSessionOptions: SessionOptions = {
    password: process.env.STATION_SESSION_COOKIE_PASSWORD ?? 'station_session_password',
    cookieName: process.env.STATION_SESSION_COOKIE_NAME ?? 'station_session_name',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
        httpOnly: true, // Prevent client-side JS access
        sameSite: 'lax', // Protect against CSRF attacks
    }
}

export const getStationSessionData = async (): Promise<IronSession<StationSessionData>> => {
    // const session = await getIronSession<StationSessionData>(await cookies(), stationSessionOptions)
    // Object.assign(session, defaultSessionStationData, session)
    // return session
    return await getIronSession<StationSessionData>(await cookies(), stationSessionOptions)
}

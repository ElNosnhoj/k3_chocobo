

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



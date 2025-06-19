

// station info
export interface StationData {
    stationName: string
    datetimeStart: string
    fabricatedQty: number
    changeOver: boolean
    changeOverQty: number
    lineChangeQty: number

    issue: boolean
    issueDuration: number
    issueNote: string

    defect: boolean
    defectQTY: number
    defectNote: string
}

// default station tracking data
export const defaultStationData: StationData = {
    stationName: "",
    datetimeStart: "",
    fabricatedQty: 0,
    
    changeOver: false,
    changeOverQty: 0,
    lineChangeQty: 0,

    issue: false,
    issueDuration: 0,
    issueNote: "",

    defect: false,
    defectQTY: 0,
    defectNote: ""
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



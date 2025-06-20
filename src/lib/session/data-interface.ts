

// station info
export interface StationData {
    stationName: string
    datetimeStart: string
    datetimeEnd: string
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
    datetimeEnd: "",
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
    userId: string
    username: string
    role: string
    isLoggedIn: boolean
    stationData?: StationData
}

// default session data
export const defaultSessionData: SessionData = {
    userId: '',
    username: '',
    role: 'user',
    isLoggedIn: false,
    stationData: defaultStationData
}



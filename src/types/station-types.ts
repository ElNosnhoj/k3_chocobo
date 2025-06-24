
// station info
export interface StationSessionData {
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
export const defaultStationSessionData: StationSessionData = {
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

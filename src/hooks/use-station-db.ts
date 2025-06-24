'use client'
import useSWRMutation from "swr/mutation"
import useSWR, { mutate } from "swr"

const stationDbUrl = '/api/station/db'

const postStationDb = async (url: string) => {
    const res = await fetch(url, { method: 'POST' })
    mutate('/api/station')
    return res.ok
}
const getStationDb = async (url: string) => {
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) {
        throw new Error('Failed to fetch station DB entries')
    }
    return res.json()
}

const patchStationDb = async (url: string, { arg }: { arg: any }) => {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    })
    if (!res.ok) {
        throw new Error('Failed to patch station DB entry')
    }
    mutate(url)
    return res.ok
}

export const useStationDB = () => {
    const { data: stationDbEntries, isLoading: isStationDbEntriesLoading, error: stationDbEntriesError, isValidating: isStationDbEntriesValidating} = useSWR(stationDbUrl, getStationDb)
    const { trigger: insertSessionDb, isMutating: isInsertSessionDbLoading } = useSWRMutation(stationDbUrl, postStationDb, {})
    const { trigger: patchSessionDb, isMutating: isPatchSessionDbLoading } = useSWRMutation(stationDbUrl, patchStationDb, {})

    return {
        stationDbEntries, isStationDbEntriesLoading, stationDbEntriesError, isStationDbEntriesValidating,
        insertSessionDb, isInsertSessionDbLoading,
        patchSessionDb, isPatchSessionDbLoading
    }
}

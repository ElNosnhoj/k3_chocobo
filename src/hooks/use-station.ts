'use client'
import { StationSessionData } from "@/types/station-types"
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"

const stationURL = '/api/station'
const getSession = async (url: string) => {
    // const stationData = await fetch(url).then(res=>res.json()).then(res=>res.session)
    const res = await fetch(url)
    if (res.ok){
        const stationData = await res.json()
        return stationData as StationSessionData
    }
}

const postSession = async (url: string) => {
    const res = await fetch(url, { method: 'POST' })
    if (!res.ok) throw new Error('Failed to reset session')
    return res.json()
}

const putSession = async (url: string, { arg }: { arg: any }) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    })
    if (!res.ok) throw new Error('Failed to replace session')
    return res.json()
}

const patchSession = async (url: string, { arg }: { arg: any }) => {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    })
    if (!res.ok) throw new Error('Failed to update session')
    return res.json()
}

const deleteSession = async (url: string) => {
    const res = await fetch(url, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete session')
    return res.json()
}

export const useStationSession = () => {
    const { data: stationSession, error: stationError, isLoading:isStationLoading, mutate: mutateStation } = useSWR(stationURL, getSession)

    const { trigger: resetStation, isMutating: isStationResetting } = useSWRMutation(stationURL, postSession, {
        onSuccess: () => mutateStation(),
    })

    const { trigger: replaceStation, isMutating: isStationReplacing } = useSWRMutation(stationURL, putSession, {
        onSuccess: () => mutateStation(),
    })

    const { trigger: updateStation, isMutating: isStationUpdating } = useSWRMutation(stationURL, patchSession, {
        onSuccess: () => mutateStation(),
    })

    const { trigger: deleteStation, isMutating: isStationDeleting } = useSWRMutation(stationURL, deleteSession, {
        onSuccess: () => mutateStation(),
    })

    return {
        stationSession,
        stationError,
        isStationLoading,
        mutateStation,
        resetStation,
        isStationResetting,
        replaceStation,
        isStationReplacing,
        updateStation,
        isStationUpdating,
        deleteSession,
        isStationDeleting,
    }
}
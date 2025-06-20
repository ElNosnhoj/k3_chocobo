import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import { SessionData, StationData } from "./data-interface"

const sessionUrl = '/api/auth/session'


const __login = async (url: string, { arg }: { arg: string }) => {
    const formData = new FormData()
    formData.append('username', arg)
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    })

    mutate(sessionUrl)
    return res.ok
}

const __logout = async (url: string) => {
    const res = await fetch(url, { method: 'POST' })
    mutate(sessionUrl)
    return res.ok
}

const __get_session = async (url: string) => {
    const session = await fetch(url).then(res => res.json())
    return session as SessionData
}

const __update_station = async (url: string, { arg }: { arg: StationData }) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    })
    if (!res.ok) {
        mutate(sessionUrl)
        try {
            const msg = await res.json()
            console.log(msg)
        }
        catch {
        }
        return true
    }
    else {
        return false
    }

}


const useSession = () => {
    const { data: session, error, isLoading, mutate } = useSWR('/api/auth/session', __get_session)
    const { trigger: login, isMutating: isLoggingIn } = useSWRMutation('/api/auth/login', __login, { revalidate: false })
    const { trigger: logout, isMutating: isLoggingOut } = useSWRMutation('/api/auth/logout', __logout, {})
    const { trigger: updateStation, isMutating: isUpdatingStation } = useSWRMutation('/api/auth/session', __update_station, {})
    return { session, error, isLoading, mutate, logout, login, updateStation, isLoggingOut, isLoggingIn, isUpdatingStation }
}

export default useSession


import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import { redirect } from "next/navigation"

const __login = async (url: string, { arg }: { arg: string }) => {
    const formData = new FormData()
    formData.append('username', arg)
    const res = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    })

    mutate('/api/auth/session')
    return res.ok
}

const __logout = async (url: string) => {
    const res = await fetch(url, { method: 'POST' })
    mutate('/api/auth/session')
    return res.ok
}

const __session = async (url: string) => {
    const session = await fetch(url).then(res => res.json())
    return session
}


const useSession = () => {
    const { data: session, error, isLoading } = useSWR('/api/auth/session', __session)
    const { trigger: login } = useSWRMutation('/api/auth/login', __login, {
        revalidate: false,
    })
    const { trigger: logout, isMutating: isLoggingOut } = useSWRMutation('/api/auth/logout', __logout, {})
    return { session, error, isLoading, logout, login }
}

export default useSession
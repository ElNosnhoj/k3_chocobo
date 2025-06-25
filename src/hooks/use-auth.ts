'use client'
import { AuthSessionData } from "@/types/auth-types"
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const authUrl = '/api/auth'

const __login = async (url: string, { arg }: { arg: string }) => {
    const formData = new FormData()
    formData.append('username', arg)
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    })

    return res.ok
}

const __logout = async (url: string) => {
    const res = await fetch(url, { method: 'DELETE' })
    return res.ok
}

const __get_session = async (url: string) => {
    const session = await fetch(url).then(res => res.json())
    return session as AuthSessionData
}

export const useAuthSession = () => {
    const {
        data: authSession,
        error: authError,
        isLoading: isAuthLoading,
        mutate: authMutate,
        isValidating: isAuthValidating
    } = useSWR(authUrl, __get_session, {
        revalidateOnReconnect: false,
        revalidateOnFocus: false
    })

    return { authSession, authError, isAuthLoading, authMutate, isAuthValidating }
}

export const useLogin = () => {
    const router = useRouter()
    const {
        trigger: login,
        data: loginResult,
        error: loginError,
        isMutating: isLoginLoading
    } = useSWRMutation(authUrl, __login, {
        revalidate: false,
        onSuccess: (data) => {
            if (data) router.push('/home')
            else toast.error(`Login failure: username not in the system`)
            mutate(authUrl)

        }
    })

    return { login, loginResult, loginError, isLoginLoading }
}

export const useLogout = () => {
    const router = useRouter()
    const {
        trigger: logout,
        data: logoutResult,
        error: logoutError,
        isMutating: isLogoutLoading
    } = useSWRMutation(authUrl, __logout, {
        onSuccess: (data) => {
            if (data) router.push('/login')
            else toast.error(`Logout failure: couldn't logout?`)
            mutate(authUrl)
        }
    })

    return { logout, logoutResult, logoutError, isLogoutLoading }
}
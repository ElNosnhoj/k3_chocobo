
// what to store in session
export interface AuthSessionData {
    userId: string
    username: string
    role: string
    isLoggedIn: boolean
}

// default session data
export const defaultAuthSessionData: AuthSessionData = {
    userId: '',
    username: '',
    role: 'user',
    isLoggedIn: false,
}



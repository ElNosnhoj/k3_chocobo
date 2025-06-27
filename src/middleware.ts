import { NextRequest, NextResponse } from "next/server"
import { getAuthSessionData } from "@/lib/session/auth-session"

export async function middleware(request: NextRequest) {
    const user = await getAuthSessionData()
    if (!user?.isLoggedIn && request.nextUrl.pathname !== '/login') return NextResponse.redirect(new URL('/login', request.url))
    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico).*)'],
}


// const token = request.cookies.get(authCookieName)?.value
    // if (!token && request.nextUrl.pathname !== '/login') return NextResponse.redirect(new URL('/login', request.url))
    // if (!token) return NextResponse.redirect(new URL('/login', request.url))
    // console.log(token)
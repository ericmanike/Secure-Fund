import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'

export function requireAuth(request: NextRequest, allowedRoles?: string[]) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token')
    response.cookies.delete('role')
    return response
  }

  if (allowedRoles && !allowedRoles.includes(decoded.role)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return null
}

export function getAuthUser(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  return verifyToken(token)
}



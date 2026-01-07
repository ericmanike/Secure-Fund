import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/data'
import { verifyPassword, generateToken } from '@/lib/auth'
import { ratelimit } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const identifier = email || request.headers.get('x-forwarded-for')
    console.log('identifier for rate limiting:', identifier);
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
  
  const { success, limit, remaining, reset } =
  await ratelimit.limit(identifier);

if (!success) {
  console.log(success, limit, remaining, reset);
  return NextResponse.json(
    { error: 'Too many requests, please try again later.' },
    {  
      status: 429, 
      headers: {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    }
     },
    
    
  );

}
    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = generateToken(user.id, user.role)

    const response = NextResponse.json({
      message: 'Login successful',
      role: user.role,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    response.cookies.set('role', user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



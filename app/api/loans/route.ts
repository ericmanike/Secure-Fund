import { NextRequest, NextResponse } from 'next/server'
import { getLoans, getLoansByUserId } from '@/lib/data'
import { getAuthUser } from '@/lib/middleware'

export async function GET(request: NextRequest) {
  try {
    const user = getAuthUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Admin can see all loans, students see only their own
    if (user.role === 'admin') {
      const loans = await getLoans()
      return NextResponse.json({ loans })
    } else {
      const loans = await getLoansByUserId(user.userId)
      return NextResponse.json({ loans })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}




import { NextRequest, NextResponse } from 'next/server'
import { saveLoan } from '@/lib/data'
import { getAuthUser } from '@/lib/middleware'

export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please login to apply for a loan.' },
        { status: 401 }
      )
    }

    const userId = user.userId

    const { fullName, email, phoneNumber, school, level, loanAmount, reason } = await request.json()

    if (!fullName || !email || !phoneNumber || !school || !level || !loanAmount || !reason) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const loan = {
      userId,
      fullName,
      email,
      phoneNumber,
      school,
      level,
      loanAmount: parseFloat(loanAmount),
      reason,
      status: 'pending' as const,
      dateApplied: new Date().toISOString(),
    }

    const loanId = await saveLoan(loan)

    return NextResponse.json(
      { message: 'Loan application submitted successfully', loanId },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



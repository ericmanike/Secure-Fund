import { NextRequest, NextResponse } from 'next/server'
import { saveLoan } from '@/lib/data'
import { getAuthUser } from '@/lib/middleware'
import { getUserById } from '@/lib/data'
export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please login to apply for a loan.' },
        { status: 401 }
      )
    }

      const fullUser = await getUserById(user.userId)

   if (!fullUser?.isEmailVerified) {
      return NextResponse.json(
        { error: 'Email not verified. Please verify your email before applying for a loan.' },
        { status: 403 }
      )
    }

    const userId = user.userId

    const { fullName, email, phoneNumber, school, otherSchool, level, loanAmount,scholar, cohort,collateral, loanType, reason } = await request.json()

    if (!fullName || !email || !phoneNumber || !school || !level || !loanAmount || !reason || !scholar || !loanType) {
      console.log('Missing fields:', { fullName, email, phoneNumber, school, level, loanAmount, reason,scholar,loanType })
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
      otherSchool,     
       level,
      loanAmount: parseFloat(loanAmount),
      scholar,
      cohort,
      collateral,
      loanType,
      reason,
      status: 'pending' as const,
      dateApplied: new Date().toISOString(),
      dueDate: 'Not set',
    }
     console.log('Saving loan application on API route:', loan)
    const loanId = await saveLoan(loan)

    return NextResponse.json(
      { message: 'Loan application submitted successfully', loanId },
      { status: 201 }
    )
  } catch (error) {
    console.log('Error processing loan application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



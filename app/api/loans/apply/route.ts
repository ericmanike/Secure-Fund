import { NextRequest, NextResponse } from 'next/server'
import { saveLoan } from '@/lib/data'
import { getAuthUser } from '@/lib/middleware'
import { getUserById } from '@/lib/data'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import connectDB from '@/lib/mongodb'
import Loan from '@/lib/models/Loan'


export async function POST(request: NextRequest) {



const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1,"1m"), 
  analytics: true, 
});










  try {
    const user = getAuthUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please login to apply for a loan.' },
        { status: 401 }
      )
    }
 

  const fullUser = await getUserById(user.userId)
      const { success, limit, remaining, reset } = await ratelimit.limit(fullUser?.email! ||  user.userId);
    
    if (!success) {
      return NextResponse.json(
        { error: `Too many requests, please try again after few minutes.`},
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

    // Check for existing pending or approved loans
     await connectDB();
      const UserLoan = await Loan.findOne({userId:user.userId,status:{$in:['pending','approved']}});
      if(UserLoan){
        return NextResponse.json(
          { error: 'You already have an active or pending loan application. Please resolve it before applying for a new loan.' },
          { status: 400 }
        )
      }
    // Check if user's email is verified
      if (!fullUser?.isEmailVerified) {
          return NextResponse.json(
            { error: 'Email not verified. Please verify your email before applying for a loan.' },
            { status: 403 }
          )
        }

        

        // All checks passed, proceed to save the loan application
        const userId = user.userId

        const { fullName, email, phoneNumber, school, otherSchool, level, loanAmount,scholar, cohort,collateral, loanType, reason } = await request.json()

        if (!fullName || !email || !phoneNumber || !school || !level || !loanAmount || !reason || !scholar || !loanType) {
        // console.log('Missing fields:', { fullName, email, phoneNumber, school, level, loanAmount, reason,scholar,loanType })
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
      dueDate:null,
    }
    // console.log('Saving loan application on API route:', loan)
    const loanId = await saveLoan(loan)

    return NextResponse.json(
      { message: 'Loan application submitted successfully', loanId },
      { status: 201 }
    )
  } catch (error) {
    //console.log('Error processing loan application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



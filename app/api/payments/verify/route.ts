import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware'
import Loan from '@/lib/models/Loan'
import connectDB from '@/lib/mongodb'
import {Repayment} from '@/lib/models/Repaid'



export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request)

    const db = await connectDB()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }



    const { reference, loanId } = await request.json()

    if (!reference || !loanId) {
      return NextResponse.json(
        { error: 'Reference and loan ID are required' },
        { status: 400 }
      )
    }

    // Verify payment with Paystack
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY 

    
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })

    const paystackData = await verifyResponse.json()
     const loan = await Loan.findById(loanId)

     

    if(!loan) {
      return NextResponse.json(
        { error: 'You do not have a loan with this ID' },
        { status: 404 }
      )
    }



    const payStackAmount = Number(paystackData.data.amount / 100)

    const currentDate = new Date()
    const loanDueDate = new Date(loan.dueDate!)
         
    const interest = currentDate  > loanDueDate    ?  ((Number(loan!.loanType) + 3 )/100)*loan!.loanAmount : (Number(loan!.loanType)/100)*loan!.loanAmount 
   
    console.log('Calculated interest:', interest)

    const expectedAmount = loan!.loanAmount + interest


    console.log('Expected amount:', expectedAmount)
    console.log('Paystack amount:', payStackAmount)
    if (paystackData.status && paystackData.data.status === 'success' && paystackData.data.amount === expectedAmount * 100) {

  
    console.log('Fetched loan for verification:', loan)


 

    if (!loan) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      )
    }
  

 
     loan.status = 'repaid'
     await loan.save()



      // Payment successful - you can update loan status or create payment record here
      // For now, we'll just return success
      const newRepayment = new Repayment({
        userId: loan.userId,
        fullName: loan.fullName,
        email: loan.email,
        phoneNumber: loan.phoneNumber,
        loanAmount: loan.loanAmount,
        dateApplied: loan.dateApplied,
        paidAt: new Date(), 
        interest: interest,
      })

     const savedrepayment = await newRepayment.save()
    console.log('Saved repayment:', savedrepayment)


      console.log('Payment verified successfully:', paystackData.data)
      return NextResponse.json({
        message: 'Payment verified successfully',
        transaction: paystackData.data,
      })
    } else {

      return NextResponse.json(
        { message: 'Unauthorized or invalid payment details' },
        { status: 400 }
      )
    }
    
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

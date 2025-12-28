import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware'

export async function POST(request: NextRequest) {
  try {
    const user = getAuthUser(request)
    
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
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key'
    
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })

    const paystackData = await verifyResponse.json()

    if (paystackData.status && paystackData.data.status === 'success') {
      // Payment successful - you can update loan status or create payment record here
      // For now, we'll just return success
      
      return NextResponse.json({
        message: 'Payment verified successfully',
        transaction: paystackData.data,
      })
    } else {
      return NextResponse.json(
        { error: 'Payment verification failed' },
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

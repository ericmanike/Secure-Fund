import { NextRequest, NextResponse } from 'next/server'
import { updateLoanStatus } from '@/lib/data'
import { requireAuth, getAuthUser } from '@/lib/middleware'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authCheck = requireAuth(request, ['admin'])
    if (authCheck) return authCheck

    const user = getAuthUser(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { status } = await request.json()

    if (status !== 'approved' && status !== 'rejected') {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const success = await updateLoanStatus(params.id, status, user.userId)

    if (!success) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Loan status updated successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



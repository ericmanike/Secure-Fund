import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Repay Loan - Secure Fund | Loan Repayment',
  description: 'Repay your approved student loan securely using Paystack. Make flexible payments for your educational loan.',
  keywords: 'repay loan, loan repayment, paystack, student loan payment',
}

export default function RepayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}




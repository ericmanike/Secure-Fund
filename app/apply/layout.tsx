import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for Loan - NyameKye Loans | Student Loan Application',
  description: 'Apply for a student loan in Ghana. Fill out our simple application form with your details, school information, and loan requirements.',
  keywords: 'apply for loan, student loan application, Ghana, loan form',
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}




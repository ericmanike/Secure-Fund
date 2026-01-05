import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - NyameKye Loans | My Loan Applications',
  description: 'View your loan applications, check application status, and manage your student loans on your Secure Fund dashboard.',
  keywords: 'dashboard, loan status, my applications, student loan dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



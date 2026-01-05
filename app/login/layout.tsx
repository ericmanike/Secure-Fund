import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - NyameKye Loans | Student Loan Platform',
  description: 'Sign in to your NyameKye Loans account to view your loan applications and manage your student loans.',
  keywords: 'login, nyamekye loans login, student loan account, sign in',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



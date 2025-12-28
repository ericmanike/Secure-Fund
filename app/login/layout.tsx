import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Secure Fund | Student Loan Platform',
  description: 'Sign in to your Secure Fund account to view your loan applications and manage your student loans.',
  keywords: 'login, secure fund login, student loan account, sign in',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



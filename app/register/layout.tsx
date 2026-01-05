import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - NyameKye Loans | Create Your Account',
  description: 'Create your NyameKye Loans account to apply for student loans. Register with your Ghana Card and Student ID to get started.',
  keywords: 'register, sign up, create account, student loan registration, Ghana',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



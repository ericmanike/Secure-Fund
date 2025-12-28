import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Secure Fund | Create Your Account',
  description: 'Create your Secure Fund account to apply for student loans. Register with your Ghana Card and Student ID to get started.',
  keywords: 'register, sign up, create account, student loan registration, Ghana',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



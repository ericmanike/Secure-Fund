import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Secure Fund | Loan Management',
  description: 'Admin dashboard for managing loan applications, approving or rejecting student loan requests.',
  keywords: 'admin dashboard, loan management, approve loans, admin panel',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



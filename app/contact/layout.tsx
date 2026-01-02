import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact- Secure Fund',
  description: 'Contact page for Secure Fund, providing support and customer service.',
  keywords: 'contact, support, help, customer service',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



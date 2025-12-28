import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'production' ? 'https://securefund.gh' : 'http://localhost:3000')
  ),
  title: {
    default: 'Secure Fund - Student Loan Platform for Ghanaian Students',
    template: '%s | Secure Fund',
  },
  description: 'Empowering Ghanaian students with accessible educational loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
  keywords: ['student loans', 'Ghana', 'education loans', 'KNUST', 'UG', 'UCC', 'university loans', 'student funding'],
  authors: [{ name: 'Secure Fund' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Secure Fund',
    title: 'Secure Fund - Student Loan Platform for Ghanaian Students',
    description: 'Empowering Ghanaian students with accessible educational loans',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Fund - Student Loan Platform',
    description: 'Empowering Ghanaian students with accessible educational loans',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}



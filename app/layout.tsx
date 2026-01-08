import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/lib/authContext'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { ToastProvider } from '@/components/toastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'production' ? 'https://nyamekyeloans.com' : 'http://localhost:3000')
  ),
  title: {
    default: 'Nyamekye Loans - Student Loan Platform for Ghanaian Students',
    template: '%s | Nyamekye Loans',
  },
  description: 'Empowering  students with accessible quick loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
  keywords: ['student loans', 'Ghana', 'education loans', 'KNUST', 'UG', 'UCC', 'university loans', 'student funding'],
  authors: [{ name: 'Nyamekye Loans' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Nyamekye Loans',
    title: 'Nyamekye Loans - Student Loan Platform for  Students',
    description: 'Empowering students with accessible quick loans',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyamekye Loans - Student Loan Platform',
    description: 'Empowering students with accessible educational loans',
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
        <ToastProvider>
        <AuthProvider>
        <Navbar />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
              <Link href={'/contact'}>  <button className="fixed bottom-8 right-8 bg-blue-600 text-white transition-all duration-600 
              md:py-3 px-4 py-2 rounded-[15px]  shadow-lg hover:bg-blue-700  flex items-center gap-2 font-bold"> Contact us Here <Phone className='rotate-[260deg]'/></button></Link>
        <Footer />
        </AuthProvider>
      </ToastProvider>
      </body>
    </html>
  )
}



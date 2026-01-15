import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/lib/authContext'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { ToastProvider } from '@/components/toastProvider'
import { FaWhatsapp} from "react-icons/fa";
import React from 'react'
import ConactAndwa from '@/components/conactAndwa'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://nyamekyeloans.vercel.app'
  ),
  title: {
    default: 'Nyamekye Loans - Student Loan Platform for Ghanaian Students',
    template: '%s | Nyamekye Loans',
  },
  description: 'Empowering  students with accessible quick loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
  keywords: ['student loans', 'Ghana', 'education loans', 'KNUST', 'UG', 'UCC', 'university loans', 'student funding'],
  authors: [{ name: 'Nyamekye Loans' }],
  openGraph: {
    images: ['https://nyamekyeloans.vercel.app/og-image.png'],
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
})


{


 

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
        <AuthProvider>
        <Navbar />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
              {/* <Link href={'/contact'}>  <button className="fixed  bottom-24 right-8 bg-blue-600 text-white transition-all duration-600 
              md:py-4 px-4 py-2  rounded-full  shadow-lg hover:bg-blue-700  flex items-center gap-2 font-bold"> Contact us Here <Phone className='rotate-[260deg]' size={18}/></button></Link>
              <Link href={'https://wa.me/233247574980'} target='_blank'>  <button className="fixed bottom-8 right-8 bg-green-500 text-white transition-all duration-600 
              md:py-4 px-4 py-2  rounded-full  shadow-lg hover:bg-green-600  flex items-center gap-2 font-bold"> Chat us on <FaWhatsapp size={22}/></button></Link>
             */}
        
        <Footer />
        <ConactAndwa/>
        </AuthProvider>
      </ToastProvider>
      </body>
    </html>
  )
}




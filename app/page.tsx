import Link from 'next/link'
import type { Metadata } from 'next'
import { GraduationCap, Wallet, Zap } from 'lucide-react'
import TextType from '@/components/TextType'


export const metadata: Metadata = {
  title: 'Home - Nyamekye Loans | Loan Platform for  Students',
  description: 'Empowering  students with accessible  loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
  keywords: 'student loans, Ghana, education loans, KNUST, UG, UCC, university loans',







  openGraph: {
    title: 'Home - Nyamekye Loans | Loan Platform for  Students',
    description: 'Empowering  students with accessible  loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
    url: 'https://nyamekyeloans.com/',
    siteName: 'Nyamekye Loans',
    images: [
      {
        url: 'https://nyamekyeloans.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nyamekye Loans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Home - Nyamekye Loans | Loan Platform for  Students',
    description: 'Empowering  students with accessible educational loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
    images: ['https://nyamekyeloans.com/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    

  },

  alternates: {
    canonical: 'https://nyamekyeloans.com/',
  },


}


export default function Home() {
  return (
    <main className="min-h-screen">
  
      {/* Hero Section */}
      <section className="  py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              Nyamekye Loans- 
               <span className=' p-3 shadow-lg'>
              <TextType text={['Accessible Loans','Made Easy','For Students']}
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={2000}
                loop={true}
               textColors={['#1E40AF']}
               cursorClassName='text-blue-600'
               cursorBlinkDuration={.6}
              />
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 ">
              Empowering  students with accessible educational loans
            </p>
            <Link
              href="/apply"
              className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-blue-700 transition duration-300 inline-block"
            >
              Apply for Loan
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-300">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Benefits  Students 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <GraduationCap className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Easy Application
              </h3>
              <p className="text-gray-600">
                Simple and straightforward application process designed for students
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <Wallet className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Flexible Repayment
              </h3>
              <p className="text-gray-600">
                Repay your loan at your own pace with our flexible payment options
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Lower Interest Rates
              </h3>
              <p className="text-gray-600">
                Benefit from competitive interest rates tailored for students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Ready to Start Your Application?
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Join thousands of Ghanaian students who have secured their educational future
          </p>
          <Link
            href="/apply"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg  transition duration-300 inline-block"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  )
}


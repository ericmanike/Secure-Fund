import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { GraduationCap, Wallet, Zap } from 'lucide-react'
import TextType from '@/components/TextType'


export const metadata: Metadata = {
  title: 'Home - Nyamekye Loans | Loan Platform for Students',
  description: 'Empowering students with accessible loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
  keywords: 'student loans, Ghana, education loans, KNUST, UG, UCC, university loans',


  



  openGraph: {
    title: 'Home - Nyamekye Loans | Loan Platform for Students',
    description: 'Empowering students with accessible loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
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
    title: 'Home - Nyamekye Loans | Loan Platform for Students',
    description: 'Empowering students with accessible educational loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
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
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-students.png"
            alt="Happy Ghanaian students"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-left text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Nyamekye Loans
              <br />
              <span className="text-blue-400 inline-block mt-2">
                <TextType 
                  text={['Accessible Loans', 'Made Easy', 'For Students']}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={2000}
                  loop={true}
                  textColors={['#60A5FA']}
                  cursorClassName='bg-blue-400'
                  cursorBlinkDuration={0.6}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-xl">
              Empowering Ghanaian students with accessible, low-interest educational loans to secure your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-xl hover:shadow-blue-500/20 text-center"
              >
                Apply for Loan
              </Link>
              <Link
                href="/about"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/20 transition duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Nyamekye Loans?
            </h2>
            <p className="text-gray-600 text-lg">
              We provide the most student-friendly financial solutions in Ghana.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="mb-6 inline-block p-4 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Easy Application
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simple and straightforward application process designed specifically for busy students. No complex paperwork.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="mb-6 inline-block p-4 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Wallet className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Flexible Repayment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Repay your loan at your own pace with our flexible payment options that adapt to your financial situation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="mb-6 inline-block p-4 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Lower Interest Rates
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Benefit from highly competitive interest rates tailored for students, making education more affordable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of Ghanaian students who have already empowered their education through Secure Fund.
          </p>
          <Link
            href="/apply"
            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-xl transition duration-300 inline-block shadow-xl hover:scale-105 transform"
          >
            Start Your Application Now
          </Link>
        </div>
      </section>
    </main>
  )
}


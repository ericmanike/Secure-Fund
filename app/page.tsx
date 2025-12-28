import Link from 'next/link'
import type { Metadata } from 'next'
import { GraduationCap, Wallet, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home - Secure Fund | Student Loan Platform for Ghanaian Students',
  description: 'Empowering Ghanaian students with accessible educational loans. Apply for student loans at KNUST, UG, UCC, and other universities in Ghana.',
  keywords: 'student loans, Ghana, education loans, KNUST, UG, UCC, university loans',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="  py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Secure Fund - Your Path to Education
            </h1>
            <p className="text-lg md:text-xl mb-8 ">
              Empowering Ghanaian students with accessible educational loans
            </p>
            <Link
              href="/apply"
              className="bg-slate-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-slate-700 transition duration-300 inline-block"
            >
              Apply for Loan
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Benefits for Ghanaian Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-primary-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 flex justify-center">
                <GraduationCap className="w-12 h-12 text-primary-600" />
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
                <Wallet className="w-12 h-12 text-primary-600" />
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
                <Zap className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Quick Approval
              </h3>
              <p className="text-gray-600">
                Fast processing and approval for eligible students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Ready to Start Your Application?
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Join thousands of Ghanaian students who have secured their educational future
          </p>
          <Link
            href="/apply"
            className="bg-primary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-primary-700 transition duration-300 inline-block"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  )
}


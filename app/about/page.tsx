import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'About Us - Secure Fund | Student Loan Platform',
  description: 'Learn about Secure Fund, our mission to support Ghanaian students, and how our loan process works. Making higher education accessible to all.',
  keywords: 'about secure fund, student loans Ghana, education funding, loan process',
}

export default function About() {
  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          About Secure Fund
        </h1>
     
        <section className="bg-slate-300 p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl text-center  decoration-solid font-semibold mb-4 text-primary-600">
            Purpose of the Platform
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Secure Fund is dedicated to supporting Ghanaian students in their educational journey. 
            We understand that financial constraints should not be a barrier to quality education. 
            Our platform provides accessible loan options specifically designed for students across 
            Ghana's leading universities and institutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe that every student deserves the opportunity to pursue their academic dreams 
            without financial worry. Our mission is to bridge the gap between ambition and 
            opportunity, making higher education more accessible to all.
          </p>
        </section>

        <section className="bg-slate-300 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl text-center decoration-solid font-semibold mb-6 text-primary-600">
            How the Loan Process Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Application</h3>
                <p className="text-gray-700">
                  Fill out our simple online application form with your personal details, 
                  school information, and loan requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Review</h3>
                <p className="text-gray-700">
                  Our team reviews your application to ensure all requirements are met 
                  and verify your eligibility.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Approval</h3>
                <p className="text-gray-700">
                  Once approved, you'll receive a notification with the details of your 
                  loan and next steps.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Repayment</h3>
                <p className="text-gray-700">
                  Repay your loan through our secure payment system using Paystack. 
                  Flexible payment options available.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}



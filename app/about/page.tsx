import type { Metadata } from 'next'
import AccordionUsage from '../../components/Accordion';

export const metadata: Metadata = {
  title: 'About Us - NyameKye Loans | Student Loan Platform',
  description: 'Learn NyameKye Loans, our mission to support Ghanaian students, and how our loan process works. Making higher education accessible to all.',
  keywords: 'about nyamekye loans, student loans Ghana, education funding, loan process',
}

export default function About() {
  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          About NyameKye Loans
        </h1>
     
        <section className=" p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl text-center  decoration-solid font-semibold mb-4 text-blue-600">
            Purpose of the Platform
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nyamekye Loans is dedicated to supporting Ghanaian students in their educational journey. 
            We understand that financial constraints should not be a barrier to quality education. 
            Our platform provides accessible loan options specifically designed for students across 
            Ghana's leading universities and institutions.
          </p>
        
        </section>

       
         {/* Application Process Section */}
        <div className="py-16 md:py-24 px-4 md:px-8" id='process'>
          <div className="max-w-6xl mx-auto">
            {/* Section heading */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-600"></div>
                <span className="text-sm uppercase tracking-widest font-semibold text-blue-600">How it works</span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Application Process</h2>
              <p className="text-gray-600 mt-4 text-lg">Simple, fast, and transparent. Get your loan in three easy steps.</p>
            </div>

        
        </div>

        {/* Divider */}
        <div className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 md:py-24 px-4 md:px-8" id='faqs'>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-600"></div>
                <span className="text-sm uppercase tracking-widest font-semibold text-blue-600">Questions?</span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-600"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <AccordionUsage />
          </div>
        </div>


        {/*terms of service*/}
           <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Privacy Policy & Terms of Service
        </h1>
        <section className=" p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl text-center  decoration-solid font-semibold mb-4 text-blue-600" id='#terms'>
            Terms of Service
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By using Nyamekye Loans, you agree to our terms of service. You agree to provide accurate information during the
             application process and to use the loan funds for educational purposes only. 
             Failure to comply with these terms may result in penalties, including legal action.

          </p>
        
        </section>

         <div className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
        </div>


        <section className=" p-8 my-10 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl text-center  decoration-solid font-semibold mb-4 text-blue-600" id='#terms'>
            Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nyamekye Loans is dedicated to supporting Ghanaian students in their educational journey. 
            We understand that financial constraints should not be a barrier to quality education. 
            Our platform provides accessible loan options specifically designed for students across 
            Ghana's leading universities and institutions.
          </p>
        
        </section>






        </div>

      </div>
    </main>
  )
}



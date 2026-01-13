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
           <h1 className="text-4xl font-bold mb-8 text-center text-gray-800"  id='termAndConditions'>
          Privacy Policy & Terms of Service
        </h1>
        <section className=" p-8 rounded-lg shadow-lg mb-8" >
          <h2 className="text-2xl text-center  decoration-solid font-semibold mb-4 text-blue-600" id='#terms'>
            Terms of Service
          </h2>
         <div className="text-gray-700 leading-relaxed space-y-6">

  <section>
    <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
    <p>
      Welcome to Nyamekye Loans. Nyamekye Loans is a digital
      loan platform designed to provide students with access to short-term
      financial assistance.
    </p>
    <p className="mt-2">
      By accessing or using our website,  application, or services
       you agree to be bound by these Terms of
      Service . If you do not agree, please do not use our Service.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">2. Eligibility</h2>
    <ul className="list-disc list-inside space-y-1">
     <li>Must be 18 years or older</li>
      <li>Be a student of a recognized tertiary institution</li>
      <li>Provide accurate and verifiable information</li>
      <li>Possess a valid Ghana Card  and Student ID (where applicable)</li>
    </ul>
    <p className="mt-2">
      We reserve the right to refuse service to anyone who does not meet our
      eligibility criteria.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">3. Account Registration</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Provide truthful and complete information</li>
      <li>Keep your login credentials secure</li>
      <li>Notify us immediately of unauthorized access</li>
    </ul>
    <p className="mt-2">
      You are responsible for all activities that occur under your account.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">4. Loan Services</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Approval based on eligibility and verification</li>
      <li>Agreed loan amount, interest, fees, and repayment period</li>
      <li>Availability of funds</li>
    </ul>
    <p className="mt-2 font-medium">Loan approval is not guaranteed.</p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">5. Interest, Fees, and Repayment</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Loan terms, interest rates, and fees will be disclosed before acceptance</li>
      <li>You agree to repay according to the agreed schedule</li>
      <li>Late repayment may result in penalties or account suspension</li>
      <li>Failure to repay may result in legal recovery actions</li>
    </ul>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">
      6. Use of Information & Verification
    </h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Verify your identity and documents</li>
      <li>Contact your institution where necessary</li>
      <li>Use third-party services for verification and payment processing</li>
    </ul>
    <p className="mt-2">
      Providing false information may result in immediate account termination.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">7. User Responsibilities</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Fraudulent or illegal use of the platform</li>
      <li>Hacking, disruption, or misuse of the system</li>
      <li>Submission of false documents or impersonation</li>
    </ul>
    <p className="mt-2">
      Violations may lead to permanent suspension and legal action.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">8. Data Protection & Privacy</h2>
   
    <p className="mt-2">
      We take reasonable steps to protect your information but cannot guarantee
      absolute security.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">9. Service Availability</h2>
    <p>
      We do not guarantee uninterrupted or error-free access and may suspend
      services for maintenance or technical reasons.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">10. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, Nyamekye Loans shall not be liable
      for indirect or consequential damages arising from misuse of the Service.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">11. Termination</h2>
    <p>
      We may suspend or terminate accounts that violate these Terms. Outstanding
      loan obligations remain enforceable.
    </p>
  </section>

  <section>
    <h2 className="text-lg font-semibold mb-2">12. Changes to Terms</h2>
    <p>
      We may update these Terms from time to time and other information as necessary. Continued use of the Service
      means acceptance of the updated Terms.
    </p>
  </section>

</div>

        
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
                 Nyamekye Loans values your privacy and is committed to protecting your personal information.

We collect personal data such as your name, contact details, student information, identification documents, and payment details to provide loan services, verify your identity, process payments, and comply with legal requirements.

Your information may be shared only with trusted third-party service providers for verification, payment processing, security, and regulatory compliance. We do not sell your personal data.
. We implement reasonable security measures to protect your information, but no system can be completely secure.

You have the right to access, update, or request deletion of your personal data, subject to legal and contractual obligations.

By using Nyamekye Loans, you consent to the collection and use of your information as described in our full Privacy Policy.
          </p>
        
        </section>






        </div>

      </div>
    </main>
  )
}



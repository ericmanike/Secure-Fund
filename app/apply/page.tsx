'use client'

import {  use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '@/lib/authContext'
import ApplicationTermsModal from '@/components/applicationTermsModal'
import { useToast } from '@/components/toastProvider'


const schools = [
  'KNUST - Kwame Nkrumah University of Science and Technology',
  'Other',
]

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^(\+233|0)[0-9]{9}$/, 'Phone number must be a valid Ghanaian number (e.g., +233XXXXXXXXX or 0XXXXXXXXX)')
    .required('Phone number is required'),
  school: Yup.string()
    .required('Please select your school'),

  otherSchool: Yup.string()
  .when('school', ([school], schema) => {
  return school === 'Other' 
    ? schema.required('Required')
    : schema.strip();
    
    }),
  level: Yup.string()
    .oneOf(['100', '200', '300', '400','500', '600'], 'Please select a valid level')
    .required('Level is required'),
  loanAmount: Yup.number()
    .min(100, 'Minimum loan amount is GHS 100')
    .max(1000, 'Maximum loan amount is GHS 1,000')
    .required('Loan amount is required')
    .typeError('Loan amount must be a number'),
  loanType:Yup.string().oneOf(['7','9','11']).required('Please select a loan type'),
  scholarStatus: Yup.string()
    .oneOf(['yes', 'no'], 'Please select a valid status')
    .required('Scholar status is required'),
  cohort: Yup.string()
   .when('scholarStatus', ([scholarStatus], schema) => {
  return scholarStatus === 'yes' 
    ? schema.required('Required')
    : schema.strip();

}).oneOf([ '8','9', 
  '10', '11', '12'], 
  'Please select a valid cohort'),
  collateral:Yup.string().when('scholarStatus', ([scholarStatus], schema) => {
  return scholarStatus === 'no' 
    ? schema.required('Required')
    : schema.strip();
}),

  reason: Yup.string()
    .min(10, 'Reason must be at least 10 characters')
    .max(500, 'Reason must be less than 500 characters')
    .required('Reason for loan is required'),
})

export default function Apply() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [loan, setLoan] = useState<any>(null)
  const [loanloading, setLoanloading] = useState(false);

  useEffect(() => {
    // Check for role cookie since token is httpOnly
    const role = Cookies.get('role')
    if (!role) {
      router.push('/login')
      return
    } else if (role == 'admin') {
      router.push('/admin')
      return
    }
    


  }, [router])



  const {showToast} = useToast();
  const [agreedToTerms, setAgreedToTerms] = useState(user?.agreedToTerms);

   const AgreeToterms = async () => { 

    try {
      const response = await fetch('/api/agreeToterm', {
        method: 'POST',
      })
      const data = await response.json()
      if (response.ok) {
        setAgreedToTerms(true);
        showToast('Successfully agreed to terms and conditions.', 'success');
        console.log('Agreed to terms successfully')
      } else {
        console.error('Error agreeing to terms:', data.error)
      }
    } catch (error) {
      console.error('Error in AgreeToterms:', error)
    }
  }







  useEffect(() => {
    const fetchLoan = async () => {
      setLoanloading(true)    
      try {
        console.log('Fetching loan data...')
        const response = await fetch('/api/loans')
        if (response.ok) {
          const data = await response.json()
          setLoan(data.loans)
          console.log('Fetched loan:', data.loans)
        }

      } catch (error) {
        console.error('Error fetching loan:', error)
      } finally {
        setLoanloading(false)
      }
    }

    fetchLoan()
  }
  , [])













  useEffect(() => {
    if (loan && loan.some((l: any) => l.status == 'pending' && l.userId === user?.id) || !user?.isEmailVerified) {
      router.push('/dashboard')
  }}
  , [loan])


 

  if (user?.role === 'student'  && loan?.some((l: any) =>l.status == 'approved' && l.userId === user.id)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Application Already Submitted</h1>
          <p className="text-gray-700">
            You have already submitted a loan application. Please wait for it to be reviewed.
          </p>
          <button onClick={()=>router.push(`/repay/${loan[0].id}`)}
            className='bg-blue-600 text-white p-3 rounded mt-4'
            
            >Repay Now</button>
        </div>
      </main>
    )
  }

  




  const handleSubmit = async (values: any, { setSubmitting, setStatus  , resetForm }: any) => {
    console.log('Submitting application with values:', values)
    try {
      const response = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          school: values.school,
          otherSchool: values.otherSchool,
          level: values.level,
          loanAmount: values.loanAmount,
          scholar: values.scholarStatus,
          cohort: values.cohort || '',
          collateral: values.collateral || '',
          loanType: values.loanType,
          reason: values.reason,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        resetForm()
        setStatus({ success: 'Application submitted successfully! You will be notified once it is reviewed.' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setStatus({ error: data.error || 'Failed to submit application. Please try again.' })
      }
    } catch (error) {
      setStatus({ error: 'An error occurred. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  
  }


  if (loading || loanloading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 bg-gray-50">

      <ApplicationTermsModal isOpen={!agreedToTerms} onClose={() => AgreeToterms()} />

      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Apply for a Loan
        </h1>

        <Formik
          initialValues={{

            fullName: '',
            email: '',
            phoneNumber: '',
            school: '',
            otherSchool: '',
            level: '',
            scholarStatus: '',
            cohort: '',
            collateral: '',
            loanType: '',
            loanAmount: '',
            reason: '',
          }}
          validationSchema={validationSchema}
          
          onSubmit={
              handleSubmit
              
          }
        >
          {({ isSubmitting, errors, touched, status,values }) => (
            <Form className="bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Momo Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                      errors.fullName && touched.fullName
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                   Momo Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                      errors.phoneNumber && touched.phoneNumber
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                    placeholder="+233 XX XXX XXXX or 0XX XXX XXXX"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>




                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                      errors.email && touched.email
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="school" className="block text-sm font-semibold text-gray-700 mb-2">
                    School / University <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="school"
                    name="school"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white ${
                      errors.school && touched.school
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select your school</option>
                    {schools.map((school) => (
                      <option key={school} value={school} className="bg-gray-800">
                        {school}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="school" component="div" className="text-red-500 text-sm mt-1" />
                </div>



               { values.school === 'Other' && (
                <div>
                  <label htmlFor="otherSchool" className="block text-sm font-semibold text-gray-700 mb-2">
                   Type University / School name<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="otherSchool"
                    name="otherSchool"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white ${
                      errors.otherSchool && touched.otherSchool
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                  >
                  
                  </Field>
                  <ErrorMessage name="otherSchool" component="div" className="text-red-500 text-sm mt-1" />
                </div>
               )}


                <div>
                  <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-2">
                    Level <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="level"
                    name="level"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white ${
                      errors.level && touched.level
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select your level</option>
                    <option value="100" className="bg-gray-800">100</option>
                    <option value="200" className="bg-gray-800">200</option>
                    <option value="300" className="bg-gray-800">300</option>
                    <option value="400" className="bg-gray-800">400</option>
                  </Field>
                  <ErrorMessage name="level" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                 <div>
                  <label htmlFor="loanType" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select  Loan Type <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="loanType"
                    name="loanType"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white ${
                      errors.loanType && touched.loanType
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select your loan type</option>
                    <option value={7} className="bg-gray-800">one weeks - 7% interest rate</option>
                    <option value={9} className="bg-gray-800">Two weeks - 9% interest rate</option>
                    <option value={11} className="bg-gray-800">One month - 11% interest rate</option>
                  </Field>
                  <ErrorMessage name="loanType" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                 <div>
                  <label htmlFor="loanAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Amount (GHS) <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    max="1000"
                    min="100"
                    defaultValue={100}
                    step={50}
                     
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                      errors.loanAmount && touched.loanAmount
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                    placeholder="Enter amount between GHS100.00 and GHS1,000.00"
                  />

                   {values.loanAmount && Number(values.loanAmount) >= 100 && Number(values.loanAmount) <= 1000 && values.loanType && (
                    <div className="text-slate-900 text-sm mt-1">Amount due will be {Math.round(Number(values.loanAmount) * (1 + Number(values.loanType) / 100))}</div>
                   )}

                  <ErrorMessage name="loanAmount" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                



                  <div>
                  <label htmlFor="scholarStatus" className="block text-sm font-semibold text-gray-700 mb-2">
                    Are you a  MCF Scholar? <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="scholarStatus"
                    name="scholarStatus"
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white ${
                      errors.scholarStatus && touched.scholarStatus
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select one</option>
                    <option value="yes" className="bg-gray-800">Yes</option>
                    <option value="no" className="bg-gray-800">No</option>
                  </Field>
                  <ErrorMessage name="scholarStatus" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                  

                  {values.scholarStatus === 'yes' &&( <div>
                  <label htmlFor="scholarStatus" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cohort <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="cohort"
                    name="cohort"
                    className={`w-full  px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white ${
                      errors.cohort && touched.cohort
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <option value="" className="bg-gray-800">Select your Cohort</option>
                    <option value="8" className="bg-gray-800">Cohort 8</option>
                    <option value="9" className="bg-gray-800">Cohort 9</option>
                    <option value="10" className="bg-gray-800">Cohort 10</option>
                    <option value="11" className="bg-gray-800">Cohort 11</option>
                    <option value="12" className="bg-gray-800">Cohort 12</option>
                  </Field>
                  <ErrorMessage name="cohort" component="div" className="text-red-500 text-sm mt-1" />
                </div>)
}             





            {values.scholarStatus ==='no' &&( 
              <div>
                  <label htmlFor="collateral" className="block text-sm font-semibold text-gray-700 mb-2">
                    What is you collateral . eg Laptop, Phone,Fridge etc. <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    id="collateral"
                    name="collateral"
                    rows={3}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 resize-none ${
                      errors.collateral && touched.collateral
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                    placeholder="Please describe your collateral..."
                  />
                  <ErrorMessage name="collateral" component="div" className="text-red-500 text-sm mt-1" />
                </div>



            )}


              {/* Reason Fields */}
               
                {/* Reason Field */}
                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Loan <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    id="reason"
                    name="reason"
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 resize-none ${
                      errors.reason && touched.reason
                        ? 'border-red-500'
                        : 'border-gray-700'
                    }`}
                    placeholder="Please explain why you need this loan..."
                  />
                  <ErrorMessage name="reason" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {status?.success && (
                  <div className="bg-green-50 border-2 border-green-200 text-green-700 p-4 rounded-lg">
                    <p className="font-medium">{status.success}</p>
                  </div>
                )}

                {status?.error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg">
                    <p className="font-medium">{status.error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}




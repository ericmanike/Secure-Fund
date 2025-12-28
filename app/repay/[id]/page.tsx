'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface Loan {
  id: string
  loanAmount: number
  fullName: string
  email: string
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string
        email: string
        amount: number
        ref: string
        onClose: () => void
        callback: (response: { reference: string }) => void
      }) => {
        openIframe: () => void
      }
    }
  }
}

export default function RepayLoan() {
  const router = useRouter()
  const params = useParams()
  const loanId = params.id as string
  const [loan, setLoan] = useState<Loan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for role cookie since token is httpOnly
    const role = Cookies.get('role')
    if (!role) {
      router.push('/login')
      return
    }

    fetchLoan()
    loadPaystackScript()
  }, [router, loanId])

  const loadPaystackScript = () => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    document.body.appendChild(script)
  }

  const fetchLoan = async () => {
    try {
      const response = await fetch('/api/loans')
      if (response.ok) {
        const data = await response.json()
        const foundLoan = data.loans.find((l: Loan) => l.id === loanId)
        if (foundLoan && foundLoan.status === 'approved') {
          setLoan(foundLoan)
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Error fetching loan:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (values: any, { setSubmitting, setStatus }: any) => {
    if (!loan) return

    if (!window.PaystackPop) {
      setStatus({ error: 'Payment gateway is loading. Please wait a moment and try again.' })
      setSubmitting(false)
      return
    }

    try {
      // Generate a unique reference
      const reference = `LOAN_${loanId}_${Date.now()}`

      // Initialize Paystack
      const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key'
      
      if (!paystackKey || paystackKey === 'pk_test_your_public_key') {
        setStatus({ error: 'Paystack public key not configured. Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your environment variables.' })
        setSubmitting(false)
        return
      }
      
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: loan.email,
        amount: parseFloat(values.amount) * 100, // Convert to kobo
        ref: reference,
        onClose: () => {
          setStatus({ error: 'Payment window closed' })
          setSubmitting(false)
        },
        callback: async (response) => {
          // Verify payment on your backend
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                reference: response.reference,
                loanId: loanId,
              }),
            })

            if (verifyResponse.ok) {
              setStatus({ success: 'Payment successful!' })
              setTimeout(() => {
                router.push('/dashboard')
              }, 2000)
            } else {
              setStatus({ error: 'Payment verification failed' })
            }
          } catch (error) {
            setStatus({ error: 'Error verifying payment' })
          } finally {
            setSubmitting(false)
          }
        },
      })

      handler.openIframe()
    } catch (error) {
      setStatus({ error: 'Error initializing payment' })
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    )
  }

  if (!loan) {
    return (
      <main className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Loan not found or not approved</div>
      </main>
    )
  }

  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(1, 'Payment amount must be at least GHS 1')
      .max(loan.loanAmount, `Payment amount cannot exceed loan amount of GHS ${loan.loanAmount.toLocaleString()}`)
      .required('Payment amount is required')
      .typeError('Payment amount must be a number'),
  })

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Repay Loan
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Loan Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-semibold">Loan Amount:</span> GHS {loan.loanAmount.toLocaleString()}</p>
                <p><span className="font-semibold">Name:</span> {loan.fullName}</p>
                <p><span className="font-semibold">Email:</span> {loan.email}</p>
              </div>
            </div>

            <Formik
              initialValues={{ amount: '' }}
              validationSchema={validationSchema}
              onSubmit={handlePayment}
            >
              {({ isSubmitting, errors, touched, status }) => (
                <Form>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Amount (GHS) <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="number"
                      id="amount"
                      name="amount"
                      min="1"
                      max={loan.loanAmount}
                      className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                        errors.amount && touched.amount
                          ? 'border-red-500'
                          : 'border-gray-700'
                      }`}
                      placeholder="Enter amount to pay"
                    />
                    <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
                    <p className="text-sm text-gray-500 mt-2">
                      Maximum: GHS {loan.loanAmount.toLocaleString()}
                    </p>
                  </div>

                  {status?.success && (
                    <div className="bg-green-50 border-2 border-green-200 text-green-700 p-4 rounded-lg mt-4">
                      <p className="font-medium">{status.success}</p>
                    </div>
                  )}

                  {status?.error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg mt-4">
                      <p className="font-medium">{status.error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-3.5 rounded-lg font-semibold hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-4"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Pay with Paystack'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-sm text-gray-500 text-center">
              You will be redirected to Paystack to complete your payment securely
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}



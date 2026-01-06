'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import RepayTermsModal from '@/components/repayTermsModal';

interface Loan {
  id: string
  loanAmount: number
  fullName: string
  email: string
  loanType: number
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string
        email: string
        currency: string
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
  const [submitting, setSubmitting] = useState(false)
  const [amountToPay, setAmountToPay] = useState<number | null>(null)
   const [isModalOpen,setIsModalOpen]  = useState(true)
  

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

useEffect(() => {
   loadPaystackScript()

  }, [])



  const fetchLoan = async () => {
    try {
      const response = await fetch('/api/loans')
      if (response.ok) {
        const data = await response.json()
        const foundLoan = data.loans.find((l: Loan) => l.id === loanId)
        if (foundLoan && foundLoan.status === 'approved') {
          setLoan(foundLoan)
          setAmountToPay(foundLoan.loanAmount + (foundLoan.loanType/100)*foundLoan.loanAmount)
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

  const handlePayment = async () => {

    if (!loan) return

    if (!window.PaystackPop) {

      setSubmitting(false)
      console.log('Paystack script not loaded')
      return
    }

    try {
      // Generate a unique reference
      const reference = `LOAN_${loanId}_${Date.now()}`

      // Initialize Paystack
      const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY 
      
      if (!paystackKey) {
     
        setSubmitting(false)
        return
      }
      
      const Amount = loan.loanAmount + (loan.loanType/100)*loan.loanAmount
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: loan.email,
        currency: 'GHS',
        amount: parseFloat(Amount.toString()) * 100, // Convert to kobo
        
        ref: reference,
        onClose: () => {
          setSubmitting(false)
        },
        callback: function (response) {
  (async () => {
    try {
      const verifyResponse = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: response.reference, loanId }),
      });

      if (verifyResponse.ok) {
        console.log('Payment verified');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        console.log('Payment verification failed');
      }
    } catch (err) {
      console.error('Error verifying payment', err);
    } finally {
      setSubmitting(false);
    }
  })();
},

      })

      handler.openIframe()
    } catch (error) {
      console.log('Error initializing payment:', error)
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



  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <RepayTermsModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Repay Loan
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Loan Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-semibold"> Amount borrowed:</span> GHS {loan.loanAmount.toLocaleString()}</p>
                <p><span className="font-semibold"> Interest on the loan:</span> {loan.loanType}%</p>
                <p><span className="font-semibold">Total Amount to Repay:</span> GHS {(loan.loanAmount + (loan.loanType/100)*loan.loanAmount).toLocaleString()}</p>
                <p><span className="font-semibold">Name:</span> {loan.fullName}</p>
                <p><span className="font-semibold">Email:</span> {loan.email}</p>
              </div>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={submitting}
              className={`w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Processing Payment...' : `Pay GHS ${amountToPay?.toLocaleString()}`}
            </button>

            <p className="text-sm text-gray-500 text-center">
             All Your Payments are Securely Processed via Paystack
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}



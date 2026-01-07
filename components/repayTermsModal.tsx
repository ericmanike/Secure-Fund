"use client"
import { useRouter } from "next/navigation"
type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function RepayTermsModal({ isOpen, onClose }: Props) {

const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"  />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Prevent Repayment Scams</h3>
  
        <div className="space-y-4 text-sm">
          <p className="font-semibold text-gray-700">
            Any request to repay via a personal account is a scam!
          </p>
             
          <div>
            <p className="mb-2">Please remember, our only official repayment methods are:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Using the "repay" section on the platform</li>
              <li>Using MTN MoMo to send to <strong>0559868785</strong></li>
            </ol>
          </div>

          <div>
            <p className="mb-2">For customer support, contact us through the following official channels:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Official number: <strong>+233 559 868 785</strong></li>
              <li>Live chat on the platform</li>
            </ul>
          </div>

          <p className="font-semibold text-gray-700">
            Any other payment request or contact method is a scam.
          </p>
        </div>

        <div className="flex  justify-between mt-6">
          <button onClick={()=> router.push('/dashboard')}>
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            I understand, continue
          </button>
        </div>
      </div>
    </div>
  )
}
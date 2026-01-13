"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationTermsModal({ isOpen, onClose }: Props) {

const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"  />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h3 className="text-lg md:text-2xl text-slate-950 font-semibold mb-4 text-center">Agreements to nyamekye loans terms and conditions</h3>
  
        <div className="space-y-4 text-sm">
          <p className="font-semibold text-gray-700">
            By clicking <span className="font-bold text-black">"Yes, I agree"</span>, you acknowledge that you have read, 
            understood, and agreed to the following terms and conditions regarding 
            the Nyamekye loan application
          </p>
          <div>
           <Link href="/about#termAndConditions" className="text-blue-600 underline">
            Read the full terms and conditions here
           </Link>
          </div>
             
        
           
          <div>
            <p className="mb-2">For customer support, contact us through the following official channels:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Official number: <strong>+233247574980</strong></li>
              <li><a href="https://wa.me/233247574980" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">WhatsApp</a></li>
            </ul>
          </div>

         
        </div>

        <div className="flex  justify-between mt-6">
          <button onClick={()=> router.push('/')}  className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors">
             Not interested!
          </button>
          <button
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
           Yes, I agree
          </button>
        </div>
      </div>
    </div>
  )
}
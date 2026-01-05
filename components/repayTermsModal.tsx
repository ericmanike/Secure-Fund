"use client"

import { useState } from 'react'
import { useToast } from './toastProvider'

type Props = {
  isOpen: boolean
 
  onClose: () => void
}

export default function ResetRequestModal({ isOpen,  onClose }: Props) {
           
    




  if (!isOpen) return null

  const handleSubmit = async () => {

    


   
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Prevent Repayment Scams</h3>
  
           <strong> Any request to repay via a personal account is a scam!</strong>
            Please remember, our only official repayment methods are:
            <ol>
            <li> Using the “repay” section on the platform </li>
           <li> 2, Using MTN momo to send to 0559868785</li>
            For customer support, contact us through the following official channels:
           <ul>
            <li> Official number: +233 559 868 785</li>
             <li> live chat on the platform </li>
            </ul>
            </ol>
          <strong> Any other payment request or contact method is a scam.</strong>  


  
          <div className="flex items-center justify-between gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">
              Close
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
            >
             I understand, continue
            </button>
          </div>
   
      </div>
    </div>
  )
}

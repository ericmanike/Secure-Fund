"use client"
import { useRouter } from "next/navigation"

type Props = {
  isOpen: boolean
  onClose: () => void
  dueDate: string
  amountDue: number | string
}

export default function OverduePopup({ isOpen, onClose, dueDate, amountDue }: Props) {

const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"  onClick={ ()=> onClose()} />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center"> </h3>
  
        <div className="space-y-4 text-sm">
          <p className="font-semibold text-red-700">
           Your loan schedule repayment is overdue and attracting additional charges.
           (3% of the principal amount)!
          </p>
             
          <div>
            <p className="mb-2">Loan information </p>
             
             <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Total amount owning:<strong> GHS {amountDue}</strong></li>
              <li>Due Date:<strong> {new Date(dueDate).toLocaleDateString()}</strong></li>
              
            </ol>

            <p className="text-slate-950">Kindly <strong>repay</strong> using one of the official methods below to avoid further actions and penalties.
              </p>

            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Using the <strong>"repay"</strong> button below    </li> 
              <div className="text-center text-1xl ">OR</div>
              <li>Using MTN MoMo to send to <strong>0559868785</strong> <br/>
              Momo name : <strong>Joshua Nyamekye Anobewoa</strong>
              </li>
            </ol>
          </div>

        
        
        </div>

        <div className="flex  justify-center mt-6">
        
          <button
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Repay now
          </button>
        </div>
      </div>
    </div>
  )
}
"use client"
import { useRouter } from "next/navigation"

type Props = {
  isOpen: boolean
  onClose: () => void
  task: () => void
  msg:JSX.Element
  
}

export default function ConfirmPopup({ isOpen, onClose, task, msg }: Props) {

const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/15"  onClick={ ()=> onClose()} />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center"> 
   {msg}
        </h3>
  
      
        <div className="flex  justify-between mt-6">




<button className="px-6 py-2 rounded-md bg-gray-300
 text-gray-800 hover:bg-gray-400 transition-colors" onClick={ ()=> onClose()}>
  cancel
</button>


        
    <button
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          onClick={()=> task()}
          >
            yes
          </button>
        </div>
      </div>
    </div>
  )
}
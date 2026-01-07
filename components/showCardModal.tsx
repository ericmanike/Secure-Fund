"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
type Props = {
  isOpen: boolean
  onClose: () => void
  image: string
}

export default function  ShowCardModal({ isOpen, onClose , image }: Props) {

const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300">
      <div className="absolute inset-0 bg-black/50"  />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg  shadow-lg p-6">
      
       <Image src={image} alt="Document" width={400} height={400} className="mx-auto mb-4"/>

    

        <div className="flex  justify-center mt-6">
       
          <button
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
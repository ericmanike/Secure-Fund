'use client'
 import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { FaWhatsapp} from "react-icons/fa";                         

function ConactAndwa() {

    const pathname = usePathname();

    const neededPath = pathname  == '/' || pathname== '/about'    ;

  return (

<>
    {neededPath && (
      <div className="fixed bottom-4 right-4 z-50">
        <Link href={'/contact'}>  <button className="fixed  bottom-24 right-8 bg-blue-600 text-white transition-all duration-600 
              md:py-4 px-4 py-2  rounded-full  shadow-lg hover:bg-blue-700  flex items-center gap-2 font-bold"> Contact us Here <Phone className='rotate-[260deg]' size={18}/></button></Link>
              <Link href={'https://wa.me/233247574980'} target='_blank'>  <button className="fixed bottom-8 right-8 bg-green-500 text-white transition-all duration-600 
              md:py-4 px-4 py-2  rounded-full  shadow-lg hover:bg-green-600  flex items-center gap-2 font-bold"> Chat us on <FaWhatsapp size={22}/></button></Link>
            

      </div>
    )}
</>
  )
}

export default ConactAndwa
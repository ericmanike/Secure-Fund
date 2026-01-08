'use client'
import React from 'react'
import OtpInput from 'react-otp-input';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/toastProvider';
export default function page() {    


    const searchParams = useSearchParams();
    const email = searchParams.get('email') 
    const OTP = searchParams.get('otp') || '';
    const [verifying, setVerifying] = React.useState(false)
    const [otp, setOtp] = React.useState(OTP);

    const {showToast} = useToast()



    const handesumit = async()=>{
        console.log("Verifying OTP:", otp);
        try {
             setVerifying(true)
            const response = await fetch('/api/auth/verifyEmail', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:email,otp})
            });
            
            const data = await response.json();
            if(response.ok){
                showToast(data.message,'success');
                window.location.href = '/dashboard';
            }else{
                showToast(data.error,'error');
            }   
        } catch (error) {
            console.error("Error verifying email:", error);
        }finally{
          setVerifying(false)
        }

    }
  return (
    <div className='w-full h-[60vh] flex flex-col items-center justify-center mt-10'>


               <div className="flex flex-col items-center justify-center my-4" id='#verifyEmail'>
                <h1 className="text-gray-800 font-semibold mb-2">Verify your email with this OTP: {OTP}</h1>
            
             
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType='text'
                  renderInput={(props) => <input {...props} className={`!w-7 h-9  md:!w-10 md:h-12 m-2 text-center border-2 border-gray-300 rounded-lg ${otp.length === 6 ? 'border-green-500' : 'border-red-300'} focus:border-blue-500 focus:outline-none`}/>}
                />

                <button className='mt-4 px-4 py-2 bg-blue-600 text-white
                 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50' disabled={otp.length !== 6}
                 onClick={handesumit}
                 
                 >
                   { verifying ? ' verifying....': ' Verify Email'}

                </button>
               


              </div>
   


    </div>
  )
}

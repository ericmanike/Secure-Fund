'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Cloud from '@/lib/cloudinary'
import ShowCardModal from '@/components/showCardModal'
import { useToast } from '@/components/toastProvider'
import OverduePopup from '@/components/overduePopup'
import { tree } from 'next/dist/build/templates/app-page'


interface Loan {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  school: string
  otherSchool: string
  level: string
  loanAmount: number
  loanType: number
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'repaid'
  dateApplied: string
  dueDate: string
}

interface User {
  id: string
  fullName: string
  email: string
  ghanaCard?: string
  studentId?: string
  role: string
  isEmailVerified:string
  ghanaCardImage?: string
  studentIdImage?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)

  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);

      const {showToast} = useToast()

//overdue popup

const [showOverduePopup, setShowOverduePopup] = useState(false);

  //show image modal

  const [isModalOpen, setIsModalOpen] = useState(false);
 const [modalImage, setModalImage] = useState<string>("");
  useEffect(() => {
    // Check for role cookie since token is httpOnly
    const role = Cookies.get('role')
    if (!role) {
      router.push('/login')

    
    }else if (role == 'admin'){ {
      router.push('/admin')
      return
    }
  }
    fetchUser()
    fetchLoans()
  }, [router])

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        console.log('Fetched user:', data.user)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const fetchLoans = async () => {
    try {
      const response = await fetch('/api/loans')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched loans:', data)
        setLoans(data.loans)
      }
    
      
     

    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
     setTimeout(() => {
      const anyOverdue = loans.some(loan => loan.status === 'approved' && new Date(loan.dueDate) < new Date());
      if (anyOverdue){
                setShowOverduePopup(true);
      }
      console.log('Checked for overdue loans:', anyOverdue);  
    }, 5000);

   
   



  }, [ loans]);

 








  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'repaid':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }



  // loading state


   
  const verifyEmail =  async() => {
    try {
        setVerifyEmailLoading(true);
      const response = await fetch('/api/auth/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.email }),
      });
    
      const data = await response.json();
      if (response.ok) {
        showToast('OTP sent to your email for verification.','success');
      } else {
         showToast(data.error || 'Failed to send OTP.','error');
      } 
    } catch (error) {
      console.error('Error sending OTP:', error);
      showToast('An error occurred while sending OTP.','error');
    } finally {
      setVerifyEmailLoading(false);
    }
   
  }



  if (loading) {
    return (
      <main className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    )
  }

  if(!user?.isEmailVerified){
 return(<div className='h-[70vh] flex flex-col justify-center items-center'>
         
         <div className='shadow-lg md:mt-10 px-5 py-10 flex flex-col justify-center items-center'>
         <h2 className='my-5 px-5 text-1xl md:text-2xl text-slate-800 text-center'>Activate your account to start your loan application ASAP</h2>
      
      <button onClick={verifyEmail} className='bg-blue-600 text-white
           border-double rounded p-2 border-2'> {verifyEmailLoading ? 'Sending OTP...' : 'Activate Account'} 
       </button>
      </div>
  
          </div>
 )
  }


  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <ShowCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}   image={modalImage}/>
      <OverduePopup isOpen={showOverduePopup} dueDate='15-01-2026'   amountDue={10} onClose={() => {router.push(`/repay/${(loans.filter(loan=>loan.status === 'approved'))[0].id} `);}} />
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className=" text-2xl md:text-4xl font-bold mb-8 text-gray-800">Application Dashboard</h1>

        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
   
          <h2 className="text-1xl md:text-3xl mb-4 text-primary-600 text-center font-bold">Personal Information    </h2>
          <div className="px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          </div>
        </div>
          {user && (
            <div className="flex flex-wrap justify-around items-center gap-4">
              <div className="space-y-2 text-[16px] md:text-2xl ">
                <p><span className="font-semibold text-gray-700">Full Name:</span> <span className="text-gray-600">{user.fullName}</span></p>
                <p><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-600">{user.email}</span></p>
              </div>
             
              <div className="space-y-2 grid grid-cols-2 items-center justify-center">
            
            <button onClick={() => {setModalImage(user?.ghanaCardImage || ""); setIsModalOpen(true);}} className='bg-blue-600 text-white p-2 w-[70%] rounded'>View </button><Cloud src={user?.ghanaCardImage} alt="Ghana Card Image" width={200} height={100}  />
            <button onClick={() => {setModalImage(user?.studentIdImage || ""); setIsModalOpen(true);}} className='bg-blue-600 text-white p-2 w-[70%] rounded'>View </button><Cloud src={user?.studentIdImage} alt="Student ID Image" width={200} height={100} />
     

              </div>
            </div>
          )}
        </div>

        {/* Loan Applications Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-primary-600">Loan Applications</h2>
          
          </div>

          {loans.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="mb-4">You haven't applied for any loans yet.</p>
              <Link
                href="/apply"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Apply for a loan now
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full min-w-[600px] md:min-w-0 overflow-x-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700"> Rate  </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700"> Total amount owning </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">School</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Applied</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">GHS {loan.loanAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">{loan?.loanType}%</td>
                      <td className="py-3 px-4"> 
                        GHS{(loan.loanAmount + (loan.loanType / 100 * loan.loanAmount) + (new Date() > new Date(loan.dueDate!) ? 0.03 * loan.loanAmount : 0)).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">{loan.school =='Other' ? loan.otherSchool : loan.school}</td>
                      <td className="py-3 px-4">Level {loan.level}</td>
                      <td className="py-3 px-4">
                        {new Date(loan.dateApplied).toLocaleDateString()}
                      </td>

                       <td className="py-3 px-4">
                        {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'Not set yet' }
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(loan.status)}`}>
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {loan.status === 'approved' && (
                          <Link
                            href={`/repay/${loan.id}`}
                            className="text-primary-600 hover:text-primary-700 font-semibold"
                          >
                            Repay
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}



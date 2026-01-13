'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import ConfirmPopup from '@/components/confirmUpdate'
import { useToast } from '@/components/toastProvider'


interface Loan {
  id: string
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  school: string
  otherSchool: string
  level: string
  loanAmount: number
  loanType: number
  scholar: string
  cohort: string
  collateral: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'repaid'
  dateApplied: string
  dueDate: string
  dateReviewed?: string
  reviewedBy?: string
}

interface UserDocuments {
  ghanaCardImage?: string
  studentIdImage?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'repaid' | 'overdue'>('all')
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [userDocuments, setUserDocuments] = useState<UserDocuments | null>(null)
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const { showToast } = useToast();

//comfirm state

const [loamToDelete, setLoamToDelete] = useState<Loan | null>(null);


  useEffect(() => {
    // Check for role cookie since token is httpOnly
    const role = Cookies.get('role')
    
    if (!role || role !== 'admin') {
      router.push('/login')
      return
    }

    fetchLoans()
  }, [router])

  const fetchLoans = async () => {
    try {
      const response = await fetch('/api/loans')
      if (response.ok) {
        const data = await response.json()
        console.log('Loans data received:', data.loans)
        setLoans(data.loans)
      }

    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      console.log(loans)
      setLoading(false)
    }
  }

  const fetchUserDocuments = async (userId: string) => {
    setLoadingDocuments(true)
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        console.log('User data received:', data.user)
        console.log('Ghana Card Image:', data.user.ghanaCardImage)
        console.log('Student ID Image:', data.user.studentIdImage)
        setUserDocuments({
          ghanaCardImage: data.user.ghanaCardImage,
          studentIdImage: data.user.studentIdImage,
        })
        setShowDocumentsModal(true)
      } else {
        const errorData = await response.json()
        console.error('Failed to load documents:', errorData)
        alert(`Failed to load documents: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      alert('An error occurred while loading documents')
    } finally {
      setLoadingDocuments(false)
    }
  }

  const updateLoanStatus = async (loanId: string, status: 'approved' | 'rejected' | 'repaid') => {
    if (!confirm(`Are you sure you want to ${status} this loan application?`)) {
      return
    }
    try {
      const response = await fetch(`/api/loans/${loanId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchLoans()
        setShowDocumentsModal(false)
      } else {
        alert('Failed to update loan status')
      }
    } catch (error) {
      alert('An error occurred')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const filteredLoans = filter === 'all' 
    ? loans 
    : loans.filter(loan => loan.status === filter)


  const deleteLoan = async (loanId:string | undefined) => {
    try {
      const response = await fetch(`/api/loans/delete?loanId=${loanId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        showToast('Loan application deleted successfully','success');
        setShowDocumentsModal(false)
        setSelectedLoan(null)
        fetchLoans()
       
      }
      else {
        const errorData = await response.json()
        showToast(`Failed to delete loan application: ${errorData.error || 'Unknown error'}`,'error');
      }
    } catch (error) {
      console.error('Error deleting loan application:', error)
      alert('An error occurred while deleting the loan application')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({loans.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'pending' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pending ({loans.filter(l => l.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'approved' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Approved ({loans.filter(l => l.status === 'approved').length})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'rejected' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rejected ({loans.filter(l => l.status === 'rejected').length})
            </button>



          <button
              onClick={() => setFilter('repaid')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'repaid' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Repaid ({loans.filter(l => l.status === 'repaid').length})
            </button>



          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {filteredLoans.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p>No loans found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <table className="w-full text-[12px] min-w-[800px] md:min-w-0 border-solid border-2 border-gray-200">
                <thead>
                  <tr className="border-b  ">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">School</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                     <th className="text-left py-3 px-4 font-semibold text-gray-700"> Rate  </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total to repay</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Applied</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700"  colSpan={10}>Collateral</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Scholar?</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Cohort</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id} className="border-b bottom-2  hover:bg-gray-50">
                    
                    <ConfirmPopup
                              isOpen={!!loamToDelete}
                              onClose={() => setLoamToDelete(null)}
                              task={() => {
                                deleteLoan(loamToDelete?.id);
                                setLoamToDelete(null);
                              }}
                              msg= {<div> Are you sure you want to delete {loamToDelete?.fullName}'s loan with status <span style={{color:"blue",fontWeight:"bold"}}>{loamToDelete?.status}</span>? <span style={{color:"red"}}><br /> This action is irreversible.</span></div>}
                            /> 
                       

                      <td className="py-3 px-4">{loan.fullName}</td>
                      <td className="py-3 px-4">{loan.email}</td>
                      <td className="py-3 px-4">{loan.phoneNumber}</td>
                      <td className="py-3 px-4">{loan.school =='Other' ? loan.otherSchool : loan.school}</td>
                      <td className="py-3 px-4">Level {loan.level}</td>
                      <td className="py-3 px-4">GHS {loan.loanAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">{loan?.loanType}%</td>
                      <td className="py-3 px-4"> 
                      GHS{(loan.loanAmount + (loan.loanType / 100 * loan.loanAmount)).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate" title={loan.reason}>
                        {loan.reason}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(loan.dateApplied).toLocaleDateString()}
                      </td>


                      <td className="py-3 px-4">
                        {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'Not set yet'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(loan.status)}`}>
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4"  colSpan={10}>{loan.collateral || 'N/A'}</td>
                      <td className="py-3 px-4">  {loan.scholar}   </td>
                      <td className="py-3 px-4">  {loan.scholar === 'yes' ? loan.cohort :'N/A'}   </td>
                      <td className="py-3 px-4">
                        {loan.status === 'pending' && (
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => {
                                setSelectedLoan(loan)
                                fetchUserDocuments(loan.userId)
                              }}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                            >
              
                              View Docs
                            </button>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => updateLoanStatus(loan.id, 'approved')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateLoanStatus(loan.id, 'rejected')}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                              >
                                Reject
                              </button>
                            
                            


                            </div>
                          </div>
                        )}
                        {loan.status !== 'pending' && (
                          <div className="flex flex-col space-y-2 justify-center items-center">

                             
                            <button
                              onClick={() => {
                                setSelectedLoan(loan)
                                fetchUserDocuments(loan.userId)
                              }}
                              className="bg-blue-600  text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                            >
                              View Docs
                            </button>
                            <span className="text-gray-500 text-sm">Reviewed</span>
                            <button onClick={() => setLoamToDelete(loan)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                              delete loan
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Documents Modal */}
        {showDocumentsModal && selectedLoan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Documents for {selectedLoan.fullName}
                  </h2>
                  <button
                    onClick={() => {
                      setShowDocumentsModal(false)
                      setUserDocuments(null)
                      setSelectedLoan(null)
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {loadingDocuments ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading documents...</p>
                  </div>
                ) : userDocuments ? (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ghana Card */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">
                          Ghana Card
                        </h3>
                        {userDocuments.ghanaCardImage ? (
                          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                            <img
                              src={userDocuments.ghanaCardImage}
                              alt="Ghana Card"
                              className="w-full h-auto rounded-lg max-h-96 object-contain"
                              onError={(e) => {
                                console.error('Error loading Ghana Card image:', userDocuments.ghanaCardImage)
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  const errorDiv = document.createElement('div')
                                  errorDiv.className = 'text-red-500 text-sm p-2'
                                  errorDiv.innerHTML = `
                                    <p>Failed to load image</p>
                                    <p class="text-xs break-all">URL: ${userDocuments.ghanaCardImage}</p>
                                    <a href="${userDocuments.ghanaCardImage}" target="_blank" class="text-blue-500 underline">Open in new tab</a>
                                  `
                                  parent.appendChild(errorDiv)
                                }
                              }}
                              onLoad={() => {
                                console.log('Ghana Card image loaded successfully:', userDocuments.ghanaCardImage)
                              }}
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">No Ghana Card image available</p>
                        )}
                      </div>

                      {/* Student ID */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">
                          Student ID
                        </h3>
                        {userDocuments.studentIdImage ? (
                          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                            <img
                              src={userDocuments.studentIdImage}
                              alt="Student ID"
                              className="w-full h-auto rounded-lg max-h-96 object-contain"
                              onError={(e) => {
                                console.error('Error loading Student ID image:', userDocuments.studentIdImage)
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  const errorDiv = document.createElement('div')
                                  errorDiv.className = 'text-red-500 text-sm p-2'
                                  errorDiv.innerHTML = `
                                    <p>Failed to load image</p>
                                    <p class="text-xs break-all">URL: ${userDocuments.studentIdImage}</p>
                                    <a href="${userDocuments.studentIdImage}" target="_blank" class="text-blue-500 underline">Open in new tab</a>
                                  `
                                  parent.appendChild(errorDiv)
                                }
                              }}
                              onLoad={() => {
                                console.log('Student ID image loaded successfully:', userDocuments.studentIdImage)
                              }}
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">No Student ID image available</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No documents found</p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedLoan.status === 'pending' && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => updateLoanStatus(selectedLoan.id, 'rejected')}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => updateLoanStatus(selectedLoan.id, 'approved')}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Approve Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}



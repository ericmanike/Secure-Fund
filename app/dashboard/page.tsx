'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'

interface Loan {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  school: string
  level: string
  loanAmount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  dateApplied: string
}

interface User {
  id: string
  fullName: string
  email: string
  ghanaCard?: string
  studentId?: string
  role: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for role cookie since token is httpOnly
    const role = Cookies.get('role')
    if (!role) {
      router.push('/login')
      return
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
        setLoans(data.loans)
      }
    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <main className="min-h-screen py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Student Dashboard</h1>

        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">Profile Information</h2>
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p><span className="font-semibold text-gray-700">Full Name:</span> <span className="text-gray-600">{user.fullName}</span></p>
                <p><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-600">{user.email}</span></p>
              </div>
              <div className="space-y-2">
                {user.ghanaCard && (
                  <p><span className="font-semibold text-gray-700">Ghana Card:</span> <span className="text-gray-600">{user.ghanaCard}</span></p>
                )}
                {user.studentId && (
                  <p><span className="font-semibold text-gray-700">Student ID:</span> <span className="text-gray-600">{user.studentId}</span></p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loan Applications Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-primary-600">Loan Applications</h2>
            <Link
              href="/apply"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              New Application
            </Link>
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
              <table className="w-full min-w-[600px] md:min-w-0">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">School</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date Applied</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">GHS {loan.loanAmount.toLocaleString()}</td>
                      <td className="py-3 px-4">{loan.school}</td>
                      <td className="py-3 px-4">Level {loan.level}</td>
                      <td className="py-3 px-4">
                        {new Date(loan.dateApplied).toLocaleDateString()}
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



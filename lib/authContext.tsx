'use client'

import { createContext, useContext, useState,useEffect, ReactNode } from 'react'

interface AuthContextType {
  user: any
  loading: boolean

}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null)
  const [loan, setLoan] = useState<any>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user')
        if (response.ok) {
            const data = await response.json()
            setUser(data.user)
            console.log('Fetched user:', data.user)
              setLoading(false)
        }
    } catch (error) {
      console.error('Error fetching user:', error)
    }

  }
  
    fetchUser()


  }, [])


  return (
    <AuthContext.Provider value={{ user,  loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)   
    if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
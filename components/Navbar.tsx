'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Menu, X, Home, Info, FileText, User, LogOut, Shield, LayoutDashboard } from 'lucide-react'
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Check for role cookie 
    const role = Cookies.get('role')
    setIsLoggedIn(!!role)
    setUserRole(role || null)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('role')
    setIsLoggedIn(false)
    setUserRole(null)
    setIsMobileMenuOpen(false)
    window.location.href = '/'
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navLinkClass = (path: string) => {
    const baseClass = "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200"
    const activeClass = pathname === path
      ? "text-primary-400 bg-gray-800 font-semibold"
      : "text-gray-300 hover:text-primary-400 hover:bg-gray-800"
    return `${baseClass} ${activeClass}`
  }

  return (
    <nav className={`sticky top-0 z-50 bg-gray-900 text-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-600 transition-colors">
              Nyamekye Loans
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ">
            <div className="flex items-center space-x-3">
              <Link href="/" className={navLinkClass('/')}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/about" className={navLinkClass('/about')}>
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
              <Link href="/apply" className={navLinkClass('/apply')}>
                <FileText className="w-4 h-4" />
                <span>Apply</span>
              </Link>
            </div>

            <div className="ml-16 flex items-center space-x-1">
              {isLoggedIn ? (
                <>
                  {userRole === 'admin' ? (
                    <Link href="/admin" className={navLinkClass('/admin')}>
                      <AdminPanelSettingsTwoToneIcon className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  ) : (
                    <Link href="/dashboard" className={navLinkClass('/dashboard')}>
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={navLinkClass('/login')}>
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <User className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Backdrop */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeMobileMenu}
            />
          )}
          {/* Menu Panel */}
          <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-gray-700">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="flex flex-col space-y-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={navLinkClass('/')}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className={navLinkClass('/about')}
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
              <Link
                href="/apply"
                onClick={closeMobileMenu}
                className={navLinkClass('/apply')}
              >
                <FileText className="w-4 h-4" />
                <span>Apply</span>
              </Link>

              {isLoggedIn ? (
                <>
                  {userRole === 'admin' ? (
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className={navLinkClass('/admin')}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className={navLinkClass('/dashboard')}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-200 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className={navLinkClass('/login')}
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}


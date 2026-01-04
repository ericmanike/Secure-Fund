"use client"

import { useState } from 'react'
import { useToast } from './toastProvider'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function ResetRequestModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const {showToast} = useToast()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/auth/requestPasswordReset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        
       console.log(res)
        showToast(' Check your email inbox for a password reset link.','success')
      } else {
        const data = await res.json()
        showToast(data.error || 'Something went wrong','error')
      }
    } catch (err) {
      showToast('Network error. Please try again.','error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Reset Password</h3>
        <p className="text-sm text-gray-600 mb-4">Enter your email to receive a password reset link.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 border rounded-md outline-none"
          />

          {message && <p className="text-sm text-gray-700">{message}</p>}

          <div className="flex items-center justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

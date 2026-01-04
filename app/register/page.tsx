"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import ResetRequestModal from '../../components/ResetRequestModal'

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  ghanaCard: Yup.string()
    .matches(/^GHA-[0-9]+-[0-9]$/i, 'Ghana Card must be in format: GHA-XXXXXXXX-X').length(15, 'Ghana Card must be exactly 15 characters')
    .required('Ghana Card number is required'),
  studentId: Yup.string()
    .length(8, 'Student ID must be exactly 8 characters')
    .required('Student ID is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  ghanaCardImage: Yup.mixed()
    .required('Ghana Card image is required')
    .test('fileSize', 'File size must be less than 5MB', (value: any) => {
      if (!value) return false
      return value.size <= 5 * 1024 * 1024
    })
    .test('fileType', 'Only JPEG, PNG, and WebP images are allowed', (value: any) => {
      if (!value) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type)
    }),
  studentIdImage: Yup.mixed()
    .required('Student ID image is required')
    .test('fileSize', 'File size must be less than 5MB', (value: any) => {
      if (!value) return false
      return value.size <= 5 * 1024 * 1024
    })
    .test('fileType', 'Only JPEG, PNG, and WebP images are allowed', (value: any) => {
      if (!value) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type)
    }),
})

export default function Register() {
  const router = useRouter()
  const [ghanaCardPreview, setGhanaCardPreview] = useState<string | null>(null)
  const [studentIdPreview, setStudentIdPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState({ ghanaCard: false, studentId: false })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'ghanaCard' | 'studentId', setPreview: (url: string | null) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadFile = async (file: File, type: 'ghanaCard' | 'studentId'): Promise<string | null> => {
    try {
      setUploadProgress(prev => ({ ...prev, [type]: true }))
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/filesUpload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.url) {
        return data.url
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
      return null
    } finally {
      setUploadProgress(prev => ({ ...prev, [type]: false }))
    }
  }

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    try {
      // Upload files first
      const ghanaCardImageUrl = await uploadFile(values.ghanaCardImage, 'ghanaCard')
      const studentIdImageUrl = await uploadFile(values.studentIdImage, 'studentId')

      if (!ghanaCardImageUrl || !studentIdImageUrl) {
        setFieldError('ghanaCardImage', 'Failed to upload images. Please try again.')
        setSubmitting(false)
        return
      }

      // Register user with image URLs
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          ghanaCard: values.ghanaCard,
          studentId: values.studentId,
          password: values.password,
          ghanaCardImage: ghanaCardImageUrl,
          studentIdImage: studentIdImageUrl,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/login')
      } else {
        if (data.error.includes('email')) {
          setFieldError('email', data.error)
        } else {
          setFieldError('password', data.error || 'Registration failed. Please try again.')
        }
      }
    } catch (error) {
      setFieldError('password', 'An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen py-16 bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join Nyamekye Loans today</p>
        </div>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            ghanaCard: '',
            studentId: '',
            password: '',
            confirmPassword: '',
            ghanaCardImage: null as File | null,
            studentIdImage: null as File | null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                    errors.fullName && touched.fullName
                      ? 'border-red-500'
                      : 'border-gray-700'
                  }`}
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                    errors.email && touched.email
                      ? 'border-red-500'
                      : 'border-gray-700'
                  }`}
                  placeholder="your.email@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="ghanaCard" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ghana Card Number <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="ghanaCard"
                  name="ghanaCard"
                  className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                    errors.ghanaCard && touched.ghanaCard
                      ? 'border-red-500'
                      : 'border-gray-700'
                  }`}
                  placeholder="GHA-XXXXXXXX-X"
                />
                <ErrorMessage name="ghanaCard" component="div" className="text-red-500 text-sm mt-1" />
                <p className="text-xs text-gray-500 mt-1">Format: GHA-XXXXXXXX-X</p>
              </div>

              <div>
                <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="studentId"
                  name="studentId"
                  className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                    errors.studentId && touched.studentId
                      ? 'border-red-500'
                      : 'border-gray-700'
                  }`}
                  placeholder="Enter your student ID"
                />
                <ErrorMessage name="studentId" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="ghanaCardImage" className="block text-sm font-semibold text-gray-700 mb-2">
                  Ghana Card Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="ghanaCardImage"
                  name="ghanaCardImage"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFieldValue('ghanaCardImage', file)
                      handleFileChange(e, 'ghanaCard', setGhanaCardPreview)
                    }
                  }}
                  className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 cursor-pointer file:text-white hover:file:bg-blue-700 ${
                    errors.ghanaCardImage && touched.ghanaCardImage
                      ? 'border-red-500'
                      : 'border-gray-700'
                  }`}
                />
                <ErrorMessage name="ghanaCardImage" component="div" className="text-red-500 text-sm mt-1" />
                {uploadProgress.ghanaCard && (
                  <p className="text-sm text-blue-600 mt-1">Uploading Ghana Card image...</p>
                )}
                {ghanaCardPreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={ghanaCardPreview}
                      alt="Ghana Card preview"
                      className="max-w-full h-48 object-contain border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPEG, PNG, WebP</p>
              </div>

              <div>
                <label htmlFor="studentIdImage" className="block text-sm font-semibold text-gray-700 mb-2">
                  Student ID Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="studentIdImage"
                  name="studentIdImage"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFieldValue('studentIdImage', file)
                      handleFileChange(e, 'studentId', setStudentIdPreview)
                    }
                  }}
                  className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold cursor-pointer file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${
                    errors.studentIdImage && touched.studentIdImage
                      ? 'border-red-500'
                      : 'border-gray-700'
                  }`}
                />
                <ErrorMessage name="studentIdImage" component="div" className="text-red-500 text-sm mt-1" />
                {uploadProgress.studentId && (
                  <p className="text-sm text-blue-600 mt-1">Uploading Student ID image...</p>
                )}
                {studentIdPreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={studentIdPreview}
                      alt="Student ID preview"
                      className="max-w-full h-48 object-contain border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPEG, PNG, WebP</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <Field name="password">
                  {({ field }: any) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="At least 6 characters"
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                          errors.password && touched.password
                            ? 'border-red-500'
                            : 'border-gray-700'
                        }`}
                      />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-3 text-sm text-gray-300">
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  )}
                </Field>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <Field name="confirmPassword">
                  {({ field }: any) => (
                    <div className="relative">
                      <input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 ${
                          errors.confirmPassword && touched.confirmPassword
                            ? 'border-red-500'
                            : 'border-gray-700'
                        }`}
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(s => !s)} className="absolute right-3 top-3 text-sm text-gray-300">
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  )}
                </Field>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Login here
          </Link>
        </p>
      <ResetRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </main>
  )
}



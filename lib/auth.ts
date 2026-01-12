import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET!

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  ghanaCard?: string
  studentId?: string
  ghanaCardImage?: string
  studentIdImage?: string
  role: 'student' | 'admin'
  isEmailVerified: boolean
  agreedToTerms: boolean
}


export const hashOtp  =  (otp: string): string => {
  return crypto.createHash('sha256').update(otp).digest('hex');
} 

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}


export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' })
}



export function verifyToken(token: string): { userId: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
    return decoded
  } catch {
    return null
  }
}



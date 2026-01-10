import connectDB from './mongodb'
import User, { IUser } from './models/User'
import Loan, { ILoan } from './models/Loan'
import { User as UserType } from './auth'
import jwt from 'jsonwebtoken'

export interface Loan {
  id: string
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  school: string
  otherSchool: string
  level: string
  loanAmount: number
  scholar: string
  collateral: string
  cohort: string
  loanType: Number
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'repaid'
  dateApplied: string
  dueDate: string | null
  dateReviewed?: string
  reviewedBy?: string
}

// Helper function to convert IUser to User type
function convertUser(user: IUser): UserType {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    ghanaCard: user.ghanaCard,
    studentId: user.studentId,
    ghanaCardImage: user.ghanaCardImage,
    studentIdImage: user.studentIdImage,
    role: user.role,
    isEmailVerified:user.isEmailVerified,
   
  }
}

// Helper function to convert ILoan to Loan  type
function convertLoan(loan: ILoan): Loan {
  return {
    id: loan._id.toString(),
    userId: loan.userId,
    fullName: loan.fullName,
    email: loan.email,
    phoneNumber: loan.phoneNumber,
    school: loan.school,
    otherSchool: loan.otherSchool,
    level: loan.level,
    loanAmount: loan.loanAmount,
    scholar: loan.scholar,
    cohort: loan.cohort,
    collateral: loan.collateral,
    loanType: loan.loanType,
    reason: loan.reason,
    status: loan.status,
    dateApplied: loan.dateApplied.toISOString(),
    dueDate: loan.dueDate?.toISOString() || null,
    dateReviewed: loan.dateReviewed?.toISOString(),
    reviewedBy: loan.reviewedBy,
  }
}

export async function getUsers(): Promise<UserType[]> {
  try {
    await connectDB()
    const users = await User.find({}).lean()
    return users.map((user: any) => convertUser(user))
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export async function saveUser(user: UserType): Promise<void> {
  try {
    await connectDB()
    const userData: any = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      ghanaCard: user.ghanaCard,
      studentId: user.studentId,
      ghanaCardImage: user.ghanaCardImage,
      studentIdImage: user.studentIdImage,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    }
    
    // Only set _id if provided (for admin creation script)
    if (user.id) {
      userData._id = user.id
    }
    
    await User.create(userData)
  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<UserType | undefined> {
  try {
    await connectDB()
    const user = await User.findOne({ email: email.toLowerCase() }).lean()
    return user ? convertUser(user as any) : undefined
  } catch (error) {
    console.error('Error fetching user by email:', error)
    return undefined
  }
}



export async function updateUserPassword(userId: string | undefined, token: string, hashedPassword: string): Promise<boolean> {
  try {
    await connectDB()
    

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

   console.log('Decoded token:', decodedToken.userId , 'Provided userId:', userId);
    if (decodedToken.userId !== userId) {
      throw new Error('Invalid token for the specified user');
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword, resetPasswordToken: null },
      { new: true }
    )
    return !!result
  } catch (error) {
    console.error('Error updating user password:', error)
    return false
  }
}





export async function getUserById(id: string): Promise<UserType | undefined> {
  try {
    await connectDB()
    const user = await User.findById(id).lean()
    return user ? convertUser(user as any) : undefined
  } catch (error) {
    console.error('Error fetching user by id:', error)
    return undefined
  }
}


export async function getLoans(): Promise<Loan[]> {
  try {
    await connectDB()
    const loans = await Loan.find({}).sort({ dateApplied: -1 }).lean()
    return loans.map((loan: any) => convertLoan(loan))
  } catch (error) {
    console.error('Error fetching loans:', error)
    return []
  }
}

export async function saveLoan(loan: Omit<Loan, 'id'>): Promise<string> {
  try {
    await connectDB()
    const newLoan = await Loan.create({
      userId: loan.userId,
      fullName: loan.fullName,
      email: loan.email,
      phoneNumber: loan.phoneNumber,
      school: loan.school,
      otherSchool: loan.otherSchool,
      level: loan.level,
      loanAmount: loan.loanAmount,
      scholar: loan.scholar,
      cohort: loan.cohort,
      collateral: loan.collateral,
      loanType: loan.loanType,
      reason: loan.reason,
      status: loan.status,
      dateApplied: new Date(loan.dateApplied),
      dueDate: loan?.dueDate ? new Date(loan?.dueDate) : null,
    })
    return newLoan._id.toString()
  } catch (error) {
    console.error('Error saving loan:', error)
    throw error
  }
}

export async function updateLoanStatus(
  loanId: string,
  status: 'approved' | 'rejected',
  reviewedBy: string
): Promise<boolean> {
  try {
    await connectDB()

    const loan = await Loan.findById(loanId)
    if (!loan) return false

    loan.status = status
    loan.reviewedBy = reviewedBy
    loan.dateReviewed = new Date()

    await loan.save()

    return true
  } catch (error) {
    console.error('Error updating loan status:', error)
    return false
  }
}


export async function getLoansByUserId(userId: string): Promise<Loan[]> {
  try {
    await connectDB()
    const loans = await Loan.find({ userId }).sort({ dateApplied: -1 }).lean()
    return loans.map((loan: any) => convertLoan(loan))
  } catch (error) {
    console.error('Error fetching loans by user id:', error)
    return []
  }
}

export async function deleteLoanById(loanId: string): Promise<boolean> {
  try {
    await connectDB()
    const result = await Loan.findByIdAndDelete(loanId)
    result?.save()
    return !!result
  } catch (error) {
    console.error('Error deleting loan:', error)
    return false
  }
}



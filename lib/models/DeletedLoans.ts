import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILoan extends Document {
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  school: string
  otherSchool: string
  level: string
  loanAmount: number
  scholar: string
  cohort: string
  collateral: string
  loanType: Number
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'repaid'
  dueDate:Date | null
  dateApplied: Date
  dateReviewed?: Date
  reviewedBy?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

const LoanSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    otherSchool: {
      type: String,
      required: false,
      trim: true,
    },

    level: {
      type: String,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    scholar: {
      type: String,
      required: true,
      trim: true,
    },
    cohort: {
      type: String,
      trim: true,
        
    },

    collateral: {
      type: String,
      trim: true,
    },

    loanType: {
      type: Number,
      required: true,
     
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'repaid'],
      default: 'pending',
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },

    
    dueDate: {
      type: Date,
      default: null
     },

     
    dateReviewed: {
      type: Date,
    },
    reviewedBy: {
      type: String,
    },
 

    deletedAt: {
      type: Date,
      default: Date.now,
    }


    },

  {
    timestamps: true,
  }
)








const deletdLoan: Model<ILoan> = mongoose.models.DeletedLoan || mongoose.model<ILoan>('DeletedLoan', LoanSchema)

export default deletdLoan



import mongoose, { Schema, Document, Model } from 'mongoose'


export interface IUser extends Document {
  fullName: string
  email: string
  password: string
  ghanaCard?: string
  studentId?: string
  ghanaCardImage?: string // URL/path to Ghana Card image
  studentIdImage?: string // URL/path to Student ID image
  role: 'student' | 'admin'
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    ghanaCard: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
    },
    studentId: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
    },
    ghanaCardImage: {
      type: String,
      trim: true,
    },
    studentIdImage: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User



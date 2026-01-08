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
  isEmailVerified: boolean
 
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
      trim: true,
     
    },
    studentId: {
      type: String,
      trim: true,
  
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

  isEmailVerified: {
      type: Boolean,
      default: false,
    },

  



  },
  {
    timestamps: true,
  }
)

UserSchema.index(
  {ghanaCard:1 },
  {unique:true,
    partialFilterExpression:{
      role:'admin',
      ghanaCard:{$exists:true, $ne:null},

    }

  }
)

UserSchema.index(
  {studentId:1 },
  {unique:true,
    partialFilterExpression:{
      role:'admin',
      studentId:{$exists:true, $ne:null},
    }

  }
)









const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User



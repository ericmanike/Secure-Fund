import mongoose, { Schema, Document, Model } from 'mongoose'


export interface IOtp extends Document {
  userId: string
  hash: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}   
const OtpSchema: Schema = new Schema(
  {
    userId: {
        type: String,
        required: true,
        index: true,
      },
    hash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
        required: true,
    },
  },
  
  {
    timestamps: true,
  }
)   

OtpSchema.index({ expiresAt: 1 },
     { expireAfterSeconds: 0 });

const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);
export default Otp;



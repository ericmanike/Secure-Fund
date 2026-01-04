import mongoose from "mongoose";

const repaymentSchema = new mongoose.Schema({

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

    loanAmount: {
      type: Number,
      required: true,
      min: 0,
    },
   
    interest:{
        type: Number,
        required: true,
    },
    dateApplied: {
      type: Date,
      require:true
    },
 
  paidAt: { type: Date, default: Date.now },
});

export const Repayment =
  mongoose.models.Repayment ||
  mongoose.model("Repayment", repaymentSchema);

import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/data";
import User from "@/lib/models/User";
import { hashOtp } from "../generate-otp/route";
import connectDB from "@/lib/mongodb";
import Otp from "@/lib/models/Otp";







export  async function POST(req:NextRequest){

    const {email,otp} = await req.json();
      
    try {
    await connectDB();
    const user = await getUserByEmail(email);
    const hashedOtp = hashOtp(otp)
    

    const otpRecord = await Otp.findOne({userId: user?.id, hash: hashedOtp});
    console.log('OTP record from DB:', otpRecord);
    if(!otpRecord){
        return NextResponse.json({error:"Invalid OTP. Please try again."},{status:400});
    }

  
    const userId = user?.id;

    const verifiedUser = await User.findByIdAndUpdate(userId,{isEmailVerified:true});
     const res  = await Otp.deleteOne({ _id: otpRecord._id });
     console.log('OTP record deleted:', res);

    console.log('Email verified for user:', verifiedUser)
    return NextResponse.json({message:"Email verified successfully."},{status:200});

} catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}   
}   




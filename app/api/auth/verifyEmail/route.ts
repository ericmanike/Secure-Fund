import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/data";
import User from "@/lib/models/User";









export  async function POST(req:NextRequest){

    const {email,otp} = await req.json();
      
    try {

    //verify otp logic here
    const verifyOtpCookie = req.cookies.get('verifyOtp')?.value;
    console.log('OTP from request:', otp);
    console.log('OTP from cookie:', verifyOtpCookie);

    if(!verifyOtpCookie){
        return NextResponse.json({error:"OTP has expired. Please request a new one."},{status:400});
    }
    if(otp !== verifyOtpCookie){
        return NextResponse.json({error:"Invalid OTP. Please try again."},{status:400});
    }
    const user = await getUserByEmail(email);
   
      if(!user)
        return NextResponse.json({error:"User not found."},{status:404});


    const userId = user?.id;

    const verifiedUser = await User.findByIdAndUpdate(userId,{isEmailVerified:true});

    console.log('Email verified for user:', verifiedUser)
    return NextResponse.json({message:"Email verified successfully."},{status:200});

} catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}   
}   




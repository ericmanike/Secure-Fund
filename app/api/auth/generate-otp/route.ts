import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from 'otp-generator';
import { Resend } from "resend";
import { ratelimit } from "@/lib/rateLimit";
import { getUserByEmail } from "@/lib/data";
import connectDB from "@/lib/mongodb";
import Otp from "@/lib/models/Otp";
import { hashOtp } from "@/lib/auth";

  

export  async function POST(req:NextRequest){
    const {email} = await req.json();
      const cookiestore = await cookies();


    
      const user = await getUserByEmail(email);


      if(!user){
        return NextResponse.json({error:`User with email ${email} not found`},{status:404});
      }

    try {
   
       
    const verificationOtp= otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false, 
        lowerCaseAlphabets: false });

    await connectDB();
    const OtpCreated = await Otp.create(
     {
      userId: user.id,
      hash: hashOtp(verificationOtp),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      }
    )
    //console.log("OTP saved to DB:", OtpCreated);




    const { success, limit, remaining, reset } = await ratelimit.limit(email);

if (!success) {
  return NextResponse.json(
    { error: `Too many requests, please try again after few minutes.`},
    {  
      status: 429, 
      headers: {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    }
     },
    
    
  );
}




  //send otp to user email logic here
    const resend = new Resend(process.env.RESEND_API_KEY);

  const sendmail =  await resend.emails.send({
      from:"NyamekyeLoans <info@nyamekyeloans.com>",
        to:`${email}`,
        subject: "Your Verification OTP",
        html: `<div style="font-size:16px;background-color:#ccc8c8;padding:10px;border-radius:5px; text-align:center;">Your OTP for email verification is: <strong>${verificationOtp}</strong></p><br/>
               <p>Click the link to verify your email.</p><br/>
               <a href="${process.env.NEXT_PUBLIC_BASE_URL}/vrifyemail?email=${email}&otp=${verificationOtp}" style="color:white;background-color:blue;padding:10px 20px;text-decoration:none;border-radius:5px;">Verify Email</a><br/>
               <p>This OTP is valid for 5 minutes.</p>
               </div>`
    });
//console.log("Resend response:", sendmail);




    cookiestore.set('verifyOtp',verificationOtp,{
        httpOnly:true,
        secure: true,
        sameSite:'lax',
        path:'/',   
        maxAge:5*60
    });

   // console.log("Generated OTP:", verificationOtp);
    return NextResponse.json({message:`OTP sent to email successfully ${verificationOtp}`},{status:200});
} catch (error) {
    console.log("Error generating OTP:", error);
    return NextResponse.json({message:`Internal Server Error ${error}`}, {status:500});

}





   







}
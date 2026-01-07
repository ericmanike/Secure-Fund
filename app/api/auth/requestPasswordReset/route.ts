import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "@/lib/data";
import { Resend } from 'resend';
import { ratelimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {

    const JWT_SECRET = process.env.JWT_SECRET!;

 function resetToken(userId: string): string {
      const payload = { userId };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' });
      return token;
    }

function verifyToken(token: string): { userId: string } | null {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }; 
        console.log('Decoded token in verifyToken:', decoded);      
        return decoded;
      } catch {
        return null;
      }
    }


  try {
    const { email } = await request.json();
    const identifier = email || request.headers.get('x-forwarded-for')
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

  
  const { success, limit, remaining, reset } =
  await ratelimit.limit(identifier);

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








    const user = await getUserByEmail(String(email).toLowerCase());


    console.log("user you are resetting password for:", user)
    // For security, respond the same whether user exists or not.
    if (!user) {
      return NextResponse.json({ error: " Please register first" });
    }

    const token = resetToken(user.id);
    if(!verifyToken(token)){
      return NextResponse.json({ error: "Could not generate reset token" }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Secure Fund <info@ericmanike.tech>',
      to: `${user.email}`,
      subject: 'Request to reset your password',
      html: `<div>
        <h1>Hi ${user.fullName},</h1>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/resetPassword?email=${user.email}&token=${token}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thanks,<br/>Secure Fund Team</p>
      </div>`,
    });

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.log("Error processing password reset request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



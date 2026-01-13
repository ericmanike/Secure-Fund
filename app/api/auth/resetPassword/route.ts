import { NextRequest, NextResponse } from "next/server";
import { updateUserPassword } from "@/lib/data";
import { hashPassword } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";

export async function POST(request: NextRequest) {
 


  try {
    const { token, newPassword, email } = await request.json();
    if (!token || !newPassword || !email) {
      return NextResponse.json(
        { error: "Token, new password, and email are required" },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(newPassword);
    const user = await getUserByEmail(email.toLowerCase());
    const success = await updateUserPassword(user?.id, token, hashedPassword);

    if (!success) {
      console.log("Invalid token or email during password reset",success);
      return NextResponse.json(
        { error: "Invalid token or email" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 




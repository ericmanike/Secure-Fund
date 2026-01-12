import { NextResponse, NextRequest } from "next/server";
import { getAuthUser } from "@/lib/middleware";
import User from "@/lib/models/User";



export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Update user's agreedToTerms field to true
    const user = await User.findById(authUser.userId);
    if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
    }
    user.agreedToTerms = true;
    await user.save();
    //console.log("User agreed to terms:", user.agreedToTerms);
    //console.log("User after agreeing to terms:", user);
           

    if (!user.agreedToTerms) {
      return NextResponse.json(
        { error: "Failed to agree to terms" },
        { status: 500 }
      );
    }


    return NextResponse.json(
      { message: "Terms and conditions accepted." },
      { status: 200 }
    );
  } catch (error) {
    //console.error("Agree to terms API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {status: 500 }
    );
  } 
}
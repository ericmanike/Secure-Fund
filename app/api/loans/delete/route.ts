import { NextRequest, NextResponse } from "next/server";
import { deleteLoanById } from "@/lib/data";

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const loanId = searchParams.get("loanId");  
    if (!loanId) {
      return NextResponse.json({ success: false, message: "Missing loanId" }, { status: 400 });
    }
    const success = await deleteLoanById(loanId);
    if (success) {
      console.log("Loan deleted successfully");
      return NextResponse.json({ success: true , message: "Loan deleted successfully" }, { status: 200 });

    } else {
      return NextResponse.json({ success: false, message: "Failed to delete loan" }, { status: 500 });
    }
    } catch (error) {   

    console.log("Error in DELETE /api/loans/delete:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
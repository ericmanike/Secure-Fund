import { NextRequest, NextResponse } from "next/server";
import { deleteLoanById } from "@/lib/data";
import Loan from "@/lib/models/Loan";
import deletdLoan from "@/lib/models/DeletedLoans";
import connectDB from "@/lib/mongodb";


export async function DELETE(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);
    const loanId = searchParams.get("loanId");  
    
      await connectDB();


      
     if (!loanId) {
      return NextResponse.json({ success: false, message: "Missing loanId" }, { status: 400 });
    } 
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return NextResponse.json({ success: false, error: "Loan not found" }, { status: 404 });
    }

    const deletedLoan = deletdLoan.create({
      userId: loan.userId,
      fullName: loan.fullName,
      email: loan.email,
      phoneNumber: loan.phoneNumber,
      school: loan.school,
      otherSchool: loan.otherSchool,
      level: loan.level,
      loanAmount: loan.loanAmount,
      scholar: loan.scholar,
      cohort: loan.cohort,
      collateral: loan.collateral,
      loanType: loan.loanType,
      reason: loan.reason,
      status: loan.status,
      dateApplied: loan.dateApplied,
      dueDate: loan.dueDate,
      dateReviewed: loan.dateReviewed,
      reviewedBy: loan.reviewedBy,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
      deletedAt: new Date(),
    });


  if (!deletedLoan) {
     console.log("Failed to archive loan before deletion", deletedLoan);
      return NextResponse.json({ success: false, message: "Failed to archive loan" }, { status: 500 });
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
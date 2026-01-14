import { NextRequest, NextResponse } from "next/server";
import Loan from "@/lib/models/Loan";
import { Repayment } from "@/lib/models/Repaid";
import deletdLoan from "@/lib/models/DeletedLoans";



export async function GET(request: NextRequest) {


  try {
    const loan = await Loan.find({}).lean();
    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 });
    } else {

      const repayments = await Repayment.find({}).lean();
      const deletedLoans = await deletdLoan.find({ }).lean();
      return NextResponse.json( { data: { loan, repayments, deletedLoans } }, { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}





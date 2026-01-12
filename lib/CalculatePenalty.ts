import User from "./models/User";
import Loan from "./models/Loan";
import connectDB from "./mongodb";


export async function calculatePenalty(userId: string): Promise<number> {
 await connectDB();
  const loans = await Loan.find({ userId, status: 'approved' });    
    let totalPenalty = 0;
    const currentDate = new Date();

    for (const loan of loans) {
        if (loan.dueDate && currentDate > loan.dueDate) {
            const overdueDays = Math.floor((currentDate.getTime() - loan.dueDate.getTime()) / (1000 * 3600 * 24));
            const penaltyRate = 0.01; 
            const penalty = loan.loanAmount * penaltyRate * overdueDays;
            totalPenalty += penalty;
        }
    }   
    return totalPenalty;
}
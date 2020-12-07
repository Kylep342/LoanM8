
import { Loan, LoanTypes } from "../Loan";
import { IFutureLoanState } from "../types/LoanStateTypes";
import { RandomID } from "../utils/RandomID";
import { apportionInterest } from "../utils/interestFuncs";


// maybe this doesn't need to be a function
const determineBeginRepaymentDate = (graduationDate: Date): Date => {
    return new Date(
        graduationDate.getFullYear(),
        graduationDate.getMonth() + 6,
        graduationDate.getDate()
    )
}

const calculateBalanceAtBeginRepayment = (
    subsidized: boolean,
    beginRepaymentDate: Date,
    firstDisbursementDate: Date,
    secondDisbursementDate: Date,
    principal: number,
    interestRate: number
): number => {
    return (
        subsidized ? principal : (principal + apportionInterest(
            principal,
            interestRate,
            beginRepaymentDate,
            [
                firstDisbursementDate,
                secondDisbursementDate
            ]
        ))
    )
}

export const createFutureLoan = (state: IFutureLoanState): Loan => {

    const name = state.name;
    // For the next 2 paramters, the TypeScript compiler will complain
    // about a type mismatch, but the JS form parsing turns everything into a string
    const principal = parseFloat(state.principal);
    const interestRate = parseFloat(state.interestRate);
    const firstDisbursementDate = new Date(state.firstDisbursementDate);
    const secondDisbursementDate = new Date(state.secondDisbursementDate);
    const subsidized = state.subsidized;
    const graduationDate = new Date(state.graduationDate);
    const autopay = state.autopay;

    const beginRepaymentDate = determineBeginRepaymentDate(graduationDate);
    const balance = calculateBalanceAtBeginRepayment(
        subsidized,
        beginRepaymentDate,
        firstDisbursementDate,
        secondDisbursementDate,
        principal,
        interestRate
    )

    const loan: Loan = {
        name: name,
        principal: principal,
        interestRate: interestRate,
        autopay: autopay,
        balance: balance,
        interest: principal - balance,
        //TODO: revisit these next two
        minPmt: parseFloat((principal / 120).toFixed(2)),
        lastPaidOn: undefined,
        dueOn: beginRepaymentDate.getDate(),
        beginRepaymentDate: beginRepaymentDate,
        lifetimePrincipalPaid: 0,
        lifetimeInterestPaid: 0,
        type: LoanTypes.Future,
        id: RandomID(),
        formState: state
    }

    return loan
}

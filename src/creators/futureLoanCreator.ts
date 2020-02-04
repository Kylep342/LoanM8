
import { Loan, LoanTypes } from "../Loan";
import { IFutureLoanState } from "../types/LoanTypes";


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
        // ternary written over two lines becaue my editor mangles text coloring otherwise
        subsidized ?
            principal :
            (
                principal +
                (
                    (
                        (1 / 2) *
                        principal *
                        (interestRate / 36525) *
                        Math.round(
                            (
                                beginRepaymentDate.valueOf() -
                                firstDisbursementDate.valueOf()
                            ) /
                            86400000
                        )
                    ) +
                    (
                        (1 / 2) *
                        principal *
                        (interestRate / 36525) *
                        Math.round(
                            (
                                beginRepaymentDate.valueOf() -
                                secondDisbursementDate.valueOf()
                            ) /
                            86400000
                        )
                    )
                )
            )
    )
}

export const createFutureLoan = (state: IFutureLoanState): Loan => {

    const name = state.name;
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
        interestRate: autopay ? interestRate - 0.25 : interestRate,
        balance: balance,
        interest: principal - balance,
        //TODO: revisit these next two
        minPmt: undefined,
        lastPaidOn: undefined,
        dueOn: beginRepaymentDate.getDate(),
        beginRepaymentDate: beginRepaymentDate,
        lifetimePrincipalPaid: 0,
        lifetimeInterestPaid: 0,
        type: LoanTypes.Future,
        formState: state
    }

    return loan
}
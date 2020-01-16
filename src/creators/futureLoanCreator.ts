
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
        subsidized ? principal :
        (
            principal +
            parseFloat(
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
                ).toFixed(2)
            )
        )
    )
}

export const createFutureLoan = (state: IFutureLoanState): Loan => {
    
    const beginRepaymentDate = determineBeginRepaymentDate(state.graduationDate);
    const balance = calculateBalanceAtBeginRepayment(
            state.subsidized,
            beginRepaymentDate,
            state.firstDisbursementDate,
            state.secondDisbursementDate,
            state.principal,
            state.interestRate
        )
    
    const loan: Loan = {
        name: state.name,
        principal: state.principal,
        interestRate: state.interestRate,
        balance: balance,
        interest: state.principal - balance,
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
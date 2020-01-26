import { Loan, LoanTypes } from "../Loan";
import { ICurrentLoanState } from "../types/LoanTypes";

/**
 *
 * Function to determine how much of an in-payment Loan's balance is principal
 *  
 * @param balance 
 * @param dailyRate 
 * @param previousPaymentDate 
 * 
 * Returns:
 *  principal: number
 *      The amount of the Loan's balance that is principal
 * 
 */
const determinePrincipal = (
    balance: number,
    dailyRate: number,
    previousPaymentDate: Date
): number => {
    let today = new Date();

    return parseFloat(
        (
            balance /
            (
                1 +
                dailyRate *
                Math.round(
                    (today.valueOf() - previousPaymentDate.valueOf()) /
                    86400000
                )
            )
        ).toFixed(2)
    )
}

/**
 * 
 * Function that creates a Loan object from the currentLoanForm
 * 
 * @param state 
 * 
 * Returns:
 *  loan: Loan
 *      A current loan Loan object for use by the calculator
 */
export const createCurrentLoan = (state: ICurrentLoanState): Loan => {
    const principal = determinePrincipal(
        state.balance,
        state.interestRate / 36525,
        state.lastPaidOn
    );

    const loan: Loan = {
        name: state.name,
        balance: state.balance,
        interestRate: state.interestRate,
        minPmt: state.minPmt,
        lastPaidOn: state.lastPaidOn,
        dueOn: state.lastPaidOn.getDate(),
        principal: principal,
        interest: state.balance - principal,
        beginRepaymentDate: new Date(
            state.lastPaidOn.getFullYear(),
            state.lastPaidOn.getMonth() + 1,
            state.lastPaidOn.getDate()
        ),
        lifetimePrincipalPaid: 0,
        lifetimeInterestPaid: 0,
        type: LoanTypes.Current,
        formState: state
    }

    return loan
}
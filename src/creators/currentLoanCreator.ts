import { Loan, LoanTypes } from "../Loan";
import { ICurrentLoanState } from "../types/LoanTypes";
import { RandomID } from "../utils/RandomID";

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

    const name = state.name;
    // For the next 3 paramters, the TypeScript compiler will complain
    // about a type mismatch, but the JS form parsing turns everything into a string
    const balance = parseFloat(state.balance)
    const interestRate = parseFloat(state.interestRate)
    const minPmt = parseFloat(state.minPmt)
    const lastPaidOn = new Date(state.lastPaidOn)

    const principal = determinePrincipal(
        balance,
        interestRate / 36525,
        lastPaidOn
    );

    const loan: Loan = {
        name: name,
        balance: balance,
        interestRate: interestRate,
        minPmt: minPmt,
        lastPaidOn: lastPaidOn,
        dueOn: lastPaidOn.getDate(),
        principal: principal,
        interest: balance - principal,
        beginRepaymentDate: new Date(
            lastPaidOn.getFullYear(),
            lastPaidOn.getMonth() + 1,
            lastPaidOn.getDate()
        ),
        lifetimePrincipalPaid: 0,
        lifetimeInterestPaid: 0,
        type: LoanTypes.Current,
        id: RandomID(),
        formState: state
    }

    return loan
}
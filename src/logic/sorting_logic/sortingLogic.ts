import { Loan } from "../../Loan";

/*
    sortLoans is used to order loans for determining the order in which loans
    receive excess payment
*/
export const sortLoans = (loans: Array<Loan>, avalanche: boolean = true) => {
    // avalanche is implemented to indicate whether the repayment method is
    // avalanche (true) or snowball (false)

    // avalanche sorts loans descending by interest rate
    //  the avalanche philosophy is to pay off the "most expensive" loans first

    // snowball sorts loans ascending by balance
    //  the snowball philosophy is to pay off the smallest loans first
    if (avalanche) {
        loans.sort(function (first, second) {
            return second.interestRate - first.interestRate
        })
    } else {
        loans.sort(function (first, second) {
            return first.balance - second.balance
        })
    }
    return loans
}

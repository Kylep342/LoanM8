import { Loan } from "../../Loan";

/*
    sortLoans is used to order loans for priority
    determinging the order in which loans receive excess payment
*/
export const sortLoans = (loans: Array<Loan>, avalanche: boolean = true) => {
    // avalanche is implemented to indicate whether the repayment method is
    // snowball (false) or avalanche (true)
    if (avalanche) {
        loans.sort(function (loan1, loan2) {
            return loan2.interestRate - loan1.interestRate
        })
    } else {
        loans.sort(function (loan1, loan2) {
            return loan1.balance - loan2.balance
        })
    }
    return loans
}

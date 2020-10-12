import { Loan } from "../../Loan";

export const sortLoans = (loans: Array<Loan>, sort: boolean = true) => {
    // sort will be implemented to indicate whether the repayment method is
    // snowball (false) or avalanche (true)
    if (sort) {
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

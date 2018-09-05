// Implementation of a Loan object in JavaScript
// Currently, the loan object is implemented only for loans yet to enter repayment
// Work is being done to generalize the object as an 'in payment' loan
// add a fast forwarding function to catch up yet to enter repayment loans
// and functionality to change the UI based upon a borrower's situation



class Loan {
  constructor (
    balance,
    rate,
    previousPayDate,
    beginRepaymentDate,
  ) {
    this.balance = balance;
    this.interest = 0;
    this.previousPayDate = previousPayDate;
    this.beginRepaymentDate = (beginRepaymentDate === null) ? new Date() : beginRepaymentDate;
    this.dueOn = this.beginRepaymentDate.getDate();
    this.rate = rate / 100;
    this.dailyRate = this.rate / 365.25;
    this.principal = this.determinePrincipal();
    this.interest = this.balance - this.principal;
    this.lifetimePrincipalPaid = 0;
    this.lifetimeInterestPaid = 0;
  };

  determinePrincipal() {
    const today = new Date();
    if (this.previousPayDate === null) {
      return this.balance;
    } else {
      return (this.balance / (1 + (this.dailyRate * Math.abs(today.getDate() - this.previousPayDate.getDate()))));
    };
  };
};

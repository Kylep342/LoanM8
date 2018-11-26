/**
*
* Implementation of a Loan object in JavaScript
*
* Notes - 2018/09/14
*
* Loan is a slim data container that supports multiple flows
* to model repayment schedules. This is imperative to make the
* UX easy for loan customers in the different phases of borrowing
* and repayment.
*
*/


class Loan {
  constructor (
    name,
    principal,
    interest,
    rate,
    dueOn,
    beginRepaymentDate,
  ) {
    this.name = name
    this.principal = principal
    this.interest = interest
    this.balance = this.principal + this.interest;
    this.beginRepaymentDate = beginRepaymentDate;
    this.dueOn = dueOn;
    this.decimalRate = rate / 100;
    this.dailyRate = this.decimalRate / 365.25;
    // Values to track lifetime stats for bar chart
    this.lifetimePrincipalPaid = 0;
    this.lifetimeInterestPaid = 0;
  };
};

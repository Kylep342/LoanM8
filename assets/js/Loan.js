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


// class Loan {
//   constructor (
//               balance,
//               rate,
//               firstDisbursementDate,
//               secondDisbursementDate,
//               subsidized,
//               graduationDate,
//               autopay,
//               minpmt = null
//             ) {
//                  this.principal = balance;
//                  this.interest = 0;
//                  this.initialRate = rate / 100;
//                  this.initialDailyRate = this.initialRate / 365.25;
//                  this.firstDisbursementDate = new Date(firstDisbursementDate);
//                  this.secondDisbursementDate = new Date(secondDisbursementDate);
//                  this.subsidized = subsidized;
//                  this.graduationDate = new Date(graduationDate);
//                  this.dueOn = this.graduationDate.getDate();
//                  this.beginRepaymentDate = this.determineBeginRepaymentDate();
//                  this.endRepaymentDate = new Date(this.beginRepaymentDate.getFullYear() + 10, this.beginRepaymentDate.getMonth(), this.beginRepaymentDate.getDate());
//                  this.interestAtBeginRepayment = this.calculateInterestAtBeginRepayment();
//                  this.minpmt = minpmt;
//                  this.autopay = autopay;
//                  if (this.autopay) {
//                    this.paymentRate = this.initialRate - .0025;
//                  } else {
//                    this.paymentRate = this.initialRate;
//                  };
//                  this.paymentDailyRate = this.paymentRate / 365.25;
//                  this.finalPaymentDate = null;
//                  this.lifetimeInterestPaid = 0;
//                  this.lifetimePrincipalPaid = 0;
//   };
//
//   determineBeginRepaymentDate() {
//     var repaymentDate;
//     if (this.graduationDate.getMonth() < 6) {
//       repaymentDate = new Date(
//         this.graduationDate.getFullYear(),
//         this.graduationDate.getMonth() + 6,
//         this.graduationDate.getDate()
//       );
//     } else {
//       repaymentDate = new Date(
//         this.graduationDate.getFullYear() + 1,
//         this.graduationDate.getMonth() - 6,
//         this.graduationDate.getDate()
//       );
//     };
//   return repaymentDate;
//   };
//
//   calculateInterestAtBeginRepayment() {
//     var firstDisbursementDays;
//     var secondDisbursementDays;
//     var interest;
//     if (this.subsidized) {
//       return 0;
//     } else {
//       firstDisbursementDays = Math.round((this.beginRepaymentDate - this.firstDisbursementDate) / 86400000);
//       secondDisbursementDays = Math.round((this.beginRepaymentDate - this.secondDisbursementDate) / 86400000);
//       interest = parseFloat((((1 / 2) * this.principal * this.initialDailyRate * firstDisbursementDays) +
//         ((1 / 2) * this.principal * this.initialDailyRate * secondDisbursementDays)).toFixed(2));
//       return interest;
//     };
//   };
// };
//

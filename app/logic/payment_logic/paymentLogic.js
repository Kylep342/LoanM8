/**
*
* Set of functions supporting paying and tracking the balance of a loan
* thoughout its payment schedule
*
*/

function pay(Loan, payment) {
  /**
  *
  * This function handles logic for making loan payments
  * Logic has been implemented to handle senseless use cases,
  * primarily, when a payment is smaller than a loan's interest
  *
  * Params:
  *   Loan     [Loan]:  A Loan object
  *   payment  [Float]: A payment
  *
  * Returns:
  *   none
  */
  if (payment <= Loan.interest) {
    Loan.interest -= payment;
    Loan.lifetimeInterestPaid += payment;
  } else {
    const paymentToPrincipal = payment - Loan.interest;
    Loan.lifetimeInterestPaid += Loan.interest;
    Loan.interest = 0;
    if (paymentToPrincipal >= Loan.principal) {
      Loan.lifetimePrincipalPaid += Loan.principal;
      Loan.principal = 0;
    } else {
      Loan.lifetimePrincipalPaid += paymentToPrincipal;
      Loan.principal -= paymentToPrincipal;
    };
  };
  Loan.lifetimeInterestPaid = parseFloat(Loan.lifetimeInterestPaid.toFixed(2));
  Loan.lifetimePrincipalPaid = parseFloat(Loan.lifetimePrincipalPaid.toFixed(2));
  Loan.balance = Loan.principal + Loan.interest;
};

function recordLoanState(Loan, dateInSchedule, paymentsArray) {
  /**
  *
  *
  *
  */
  paymentsArray.push([
    dateInSchedule.toLocaleDateString(),
    Loan.balance,
    Loan.lifetimePrincipalPaid + Loan.lifetimeInterestPaid,
    Loan.lifetimeInterestPaid
  ]);
}

function accrueInterest(Loan) {
  /**
  *
  * This function computes one day's accrual of interest for a loan
  * It modifies the interest property of the Loan
  * Within the scope of this app, this function is only used during the repayment
  * of a loan, due to the nuances that automatic electronic payments introduce
  * to interest rates
  *
  */
  Loan.interest += parseFloat((Loan.principal * Loan.dailyRate).toFixed(2));
};

function paymentSchedules(loansArray, payment) {
  /**
  *
  * Function to generate payment data for loans
  *
  * Arguments:
  *   loansArray  [Array]{Loan}:  Arr
  *   payment     [Float]:        Pa
  *
  */

  // clone an Array of Loans from those added by the user
  // this is done to handle current need for mutability
  loans = loansArray.slice(0);

  // core data structure to contain graph points and lifetime payment totals
  let loansPaymentData = {};

  loans.forEach(function(loan) {
    loansPaymentData[loan.name] = {
      dailyBalanceData: {
        dates:     [],
        interest:  [],
        principal: [],
        balance:   []
      },
      lifetimeData: {
        lifetimeInterestPaid:  0,
        lifetimePrincipalPaid: 0,
        finalPaymentDate:      null
      },
      paymentTables: {}
    }
  });

  let dateOfRepayment = new Date(dummyLoan.beginRepaymentDate.valueOf() - (1 * 86400000));
  const startDateStr = dateOfRepayment.toISOString();
  loanPaymentData.dailyBalanceData.dates.push(startDateStr);
  loanPaymentData.dailyBalanceData.interest.push(dummyLoan.interest);
  loanPaymentData.dailyBalanceData.principal.push(dummyLoan.principal);
  loanPaymentData.dailyBalanceData.balance.push(dummyLoan.interest + dummyLoan.principal);
  LoanM8.paymentsTables[payment] = []
  recordLoanState(
    dummyLoan,
    dateOfRepayment,
    LoanM8.paymentsTables[payment]
  );

  while (true) {
    const dateStr = dateOfRepayment.toISOString();
    accrueInterest(dummyLoan);
    if (dateOfRepayment.getDate() === dummyLoan.dueOn) {
      pay(dummyLoan, payment);
      recordLoanState(
        dummyLoan,
        dateOfRepayment,
        LoanM8.paymentsTables[payment]
      );
    };
    loanPaymentData.dailyBalanceData.dates.push(dateStr);
    loanPaymentData.dailyBalanceData.interest.push(dummyLoan.interest);
    loanPaymentData.dailyBalanceData.principal.push(dummyLoan.principal);
    loanPaymentData.dailyBalanceData.balance.push(dummyLoan.interest + dummyLoan.principal);
    if (dummyLoan.principal === 0) {
      loanPaymentData.lifetimeData.finalPaymentDate = dateOfRepayment;
      break;
    };
    dateOfRepayment.setDate(dateOfRepayment.getDate() + 1);
    };
  loanPaymentData.lifetimeData.lifetimeInterestPaid = parseFloat((dummyLoan.lifetimeInterestPaid).toFixed(2));
  loanPaymentData.lifetimeData.lifetimePrincipalPaid = parseFloat((dummyLoan.lifetimePrincipalPaid).toFixed(2));
  return loanPaymentData;
};

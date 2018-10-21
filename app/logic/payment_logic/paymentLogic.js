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
  Loan.balance = Loan.principal + Loan.interest;
};


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

function paymentSchedule(Loan, payment) {
  /**
  *
  * Function to generate graphing data
  *
  */

  // create a copy of the passed Loan, as some values are changed
  // on the base object to compute loan payment data
  dummyLoan = Object.assign(Object.create(Object.getPrototypeOf(Loan)), Loan);

  // core data structure to contain graph points and lifetime payment totals
  let loanPaymentData = {
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
    }
  };

  let dateOfRepayment = new Date(dummyLoan.beginRepaymentDate.valueOf() - (1 * 86400000));
  const startDateStr = dateOfRepayment.toISOString();
  loanPaymentData.dailyBalanceData.dates.push(startDateStr);
  loanPaymentData.dailyBalanceData.interest.push(dummyLoan.interest);
  loanPaymentData.dailyBalanceData.principal.push(dummyLoan.principal);
  loanPaymentData.dailyBalanceData.balance.push(dummyLoan.interest + dummyLoan.principal);

  while (true) {
    const dateStr = dateOfRepayment.toISOString();
    accrueInterest(dummyLoan);
    if (dateOfRepayment.getDate() === dummyLoan.dueOn) {
      pay(dummyLoan, payment);
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
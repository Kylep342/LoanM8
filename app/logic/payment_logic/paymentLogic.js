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

function allocatePayments(loansArray, payment) {
  /**
  *
  * This function determines how much each loan should receive in payment
  *
  * Arguments:
  *   loansArray  [Array]{Loan}:  Array of Loan objects
  *   payment     [float]:        Total payment contribution for a month
  *
  */
  let payments = [];
  loansArray.forEach(function(loan) {
    let amt = Math.min(loan.minPmt, loan.balance);
    payments.push(amt);
    payment -= amt;
  });
  /**
  * after meeting minimum payment obilgations for each loan
  * add any remaming available payment to the first loan's payment
  * as long as it makes sense
  * (while there is one loan with a balance greater than the minimum payment)
  */
  if (payments[0] < loans[0].balance) {
      payments[0] += payment;
  }
  return payments;
}

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

  let dateOfRepayment = new Date(loans[0].beginRepaymentDate.valueOf());
  const dueDay = loans[0].dueOn;
  const startDateStr = dateOfRepayment.toISOString();

  // Set up data container for payment info and initialize
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
      paymentsTable: []
    }
    loansPaymentData[loan.name].dailyBalanceData.dates.push(startDateStr);
    loansPaymentData[loan.name].dailyBalanceData.interest.push(loan.interest);
    loansPaymentData[loan.name].dailyBalanceData.principal.push(loan.principal);
    loansPaymentData[loan.name].dailyBalanceData.balance.push(loan.interest + loan.principal);
    recordLoanState(
      loan,
      dateOfRepayment,
      loansPaymentData[loan.name].paymentsTable
    );
  });

  while (loans.length) {
    const dateStr = dateOfRepayment.toISOString();
    loans.forEach(function(loan) {
      accrueInterest(loan);
    }
    if (dateOfRepayment.getDate() === dueDay) {
      payments = allocatePayments(loans, payment);
      loans.forEach(function(loan, index) {
        pay(loan, payments[index]);
        recordLoanState(
          loan,
          dateOfRepayment,
          loansPaymentData[loan.name].paymentsTable
        );
        loanPaymentData[loan.name].dailyBalanceData.dates.push(dateStr);
        loanPaymentData[loan.name].dailyBalanceData.interest.push(loan.interest);
        loanPaymentData[loan.name].dailyBalanceData.principal.push(loan.principal);
        loanPaymentData[loan.name].dailyBalanceData.balance.push(loan.interest + loan.principal);
        if (loan.principal === 0) {
          loanPaymentData[loan.name].lifetimeData.finalPaymentDate = dateOfRepayment;
          loanPaymentData[loan.name].lifetimeData.lifetimeInterestPaid = loan.lifetimeInterestPaid;
          loanPaymentData[loan.name].lifetimeData.lifetimePrincipalPaid = loan.lifetimePrincipalPaid;
          loans.splice(index, 1);
        };
      });
    };
    dateOfRepayment.setDate(dateOfRepayment.getDate() + 1);
  }
  return loansPaymentData;
};

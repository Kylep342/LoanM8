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
  for (loan of loansArray) {
    let amt = Math.min(loan.minPmt, loan.balance);
    payments.push(amt);
    payment -= amt;
  };
  /**
  * after meeting minimum payment obilgations for each loan
  * distribute any remaming available payment amount as follows
  *
  * while remaining payment > 0, add the minimum of:
  * (balance above minpmt) OR (remaining payment)
  * to the highest priority loan (i.e. lowest index in array)
  * while there is one loan with a balance greater than the minimum payment
  */
  for (index in loansArray) {
      balanceAboveMin = loansArray[index].balance - Math.min(loansArray[index].minpmt, loansArray[index].balance);
      additionalAmount = Math.min(balanceAboveMin, payment);
      payments[index] += additionalAmount;
      payment -= additionalAmount;
      if (payment === 0) { break }
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
  * Returns:
  *   loansPaymentData  [JSON]:   pass
  */

  // clone an Array of Loans from those added by the user
  // this is done to handle current need for mutability
  loans = JSON.parse(JSON.stringify(loansArray));

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
      loansPaymentData[loan.name].dailyBalanceData.dates.push(dateStr);
      loansPaymentData[loan.name].dailyBalanceData.interest.push(loan.interest);
      loansPaymentData[loan.name].dailyBalanceData.principal.push(loan.principal);
      loansPaymentData[loan.name].dailyBalanceData.balance.push(loan.interest + loan.principal);
    });
    if (dateOfRepayment.getDate() === dueDay) {
      payments = allocatePayments(loans, payment);
      loans.forEach(function(loan, index) {
        pay(loan, payments[index]);
        recordLoanState(
          loan,
          dateOfRepayment,
          loansPaymentData[loan.name].paymentsTable
        );
        if (loan.principal === 0) {
          loansPaymentData[loan.name].lifetimeData.finalPaymentDate = new Date(dateOfRepayment.toISOString());
          loansPaymentData[loan.name].lifetimeData.lifetimeInterestPaid = loan.lifetimeInterestPaid;
          loansPaymentData[loan.name].lifetimeData.lifetimePrincipalPaid = loan.lifetimePrincipalPaid;
          loans.splice(index, 1);
        };
      });
    };
    dateOfRepayment.setDate(dateOfRepayment.getDate() + 1);
  }
  return loansPaymentData;
};

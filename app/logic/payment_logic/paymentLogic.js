/**
*
* Set of functions supporting paying and tracking the balance of a loan
* thoughout its payment schedule
*
*/

/**
*
* Function to make a payment to a Loan
* The Loan is modified in place to reflect its state
*
* Arguments:
*   Loan     [Loan]:  A Loan object
*   payment  [Float]: A payment
*
*/
function pay(Loan, payment) {
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
    }
  }
  Loan.balance = Loan.principal + Loan.interest;
}

/**
*
* Function to record key attributes of a Loan
* (date, current Loan balance, Total paid to Loan to date, Total interest paid to Loan to date)
*
* Arguments:
*   Loan            [Loan]:   A Loan object
*   dateInSchedule  [Date]:   A date representing when the Loan has been paid
*   paymentsArray   [Array]:  Data container for recording stats over the lifetime of the Loan
*
*/
function recordLoanState(Loan, dateInSchedule, paymentsArray) {
  paymentsArray.push([
    dateInSchedule.toLocaleDateString(),
    Loan.balance,
    Loan.lifetimePrincipalPaid + Loan.lifetimeInterestPaid,
    Loan.lifetimeInterestPaid
  ]);
}

/**
*
* This function computes one day's accrual of interest for a loan
* It modifies the interest property of the Loan
* Within the scope of this app, this funciton is only used during the repayment
* of a Loan, due to the nuances that automatic electronic payments introduce
* to interest rates
*
*/
function accrueInterest(Loan) {
  Loan.interest += parseFloat((Loan.principal * Loan.dailyRate).toFixed(2));
}

/**
*
* This function determines how much each loan should receive in payment
*
* Arguments:
*   loansArray  [Array]{Loan}:  Array of Loan objects
*   payment     [float]:        Total payment contribution for a month
*
*/
function allocatePayments(loansArray, payment) {
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
  for (index in payments) {
    let additionalAmount = Math.min((loansArray[index].balance - payments[index]), payment);
    payments[index] += additionalAmount;
    payment -= additionalAmount;
    if (payment === 0) { break; }
  }
  return payments;
}

/**
 * 
 * @param {*} loansPaymentsData 
 * @param {*} dateString 
 */
function initAllLoansBalanceValuesForDate(loansPaymentsData, dateString) {
  loansPaymentsData['All Loans'].dailyBalanceData.dates.push(dateString);
  loansPaymentsData['All Loans'].dailyBalanceData.interest.push(0);
  loansPaymentsData['All Loans'].dailyBalanceData.principal.push(0);
  loansPaymentsData['All Loans'].dailyBalanceData.balance.push(0); 
}

function updateAllLoansBalanceValuesForDate(loansPaymentsData, Loan) {
  loansPaymentsData['All Loans'].dailyBalanceData.interest[loansPaymentsData['All Loans'].dailyBalanceData.interest.length - 1] += Loan.interest;
  loansPaymentsData['All Loans'].dailyBalanceData.principal[loansPaymentsData['All Loans'].dailyBalanceData.principal.length - 1] += Loan.principal;
  loansPaymentsData['All Loans'].dailyBalanceData.balance[loansPaymentsData['All Loans'].dailyBalanceData.balance.length - 1] += (Loan.interest + Loan.principal);
}

function updateAllLoansLifetimeValues(loansPaymentsData, Loan, finalPaymentDate) {
  loansPaymentsData['All Loans'].lifetimeData.lifetimeInterestPaid += Loan.lifetimeInterestPaid;
  loansPaymentsData['All Loans'].lifetimeData.lifetimePrincipalPaid += Loan.lifetimePrincipalPaid;
  loansPaymentsData['All Loans'].lifetimeData.finalPaymentDate = finalPaymentDate;
}

/**
*
* Function to generate payment data for loans
*
* Arguments:
*   loansArray  [Array]:  Array containing Loans created by the user
*   payment     [Float]:  Payment amount entered by the user
*
* Returns:
*   loansPaymentsData  [Object]:   pass
*/
function paymentSchedules(loansArray, payment) {
  // clone an Array of Loans from those added by the user
  // this is done to handle current need for mutability
  loans = JSON.parse(JSON.stringify(loansArray));

  // core data structure to contain graph points and lifetime payment totals
  let loansPaymentsData = {};

  let dateOfRepayment = new Date(loans[0].beginRepaymentDate.valueOf());
  const dueDay = loans[0].dueOn;
  const startDateStr = dateOfRepayment.toISOString();

  loansPaymentsData['All Loans'] = {
    dailyBalanceData: {
      dates: [],
      interest: [],
      principal: [],
      balance: []
    },
    lifetimeData: {
      lifetimeInterestPaid: 0,
      lifetimePrincipalPaid: 0,
      finalPaymentDate: null
    },
    paymentsTable: []
  } 

  initAllLoansBalanceValuesForDate(loansPaymentsData, startDateStr);
  // Set up data container for payment info and initialize
  for (loan of loans) {
    loansPaymentsData[loan.name] = {
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
    loansPaymentsData[loan.name].dailyBalanceData.dates.push(startDateStr);
    loansPaymentsData[loan.name].dailyBalanceData.interest.push(loan.interest);
    loansPaymentsData[loan.name].dailyBalanceData.principal.push(loan.principal);
    loansPaymentsData[loan.name].dailyBalanceData.balance.push(loan.interest + loan.principal);

    updateAllLoansBalanceValuesForDate(loansPaymentsData, loan);

    recordLoanState(
      loan,
      dateOfRepayment,
      loansPaymentsData[loan.name].paymentsTable
    );
  };

  while (loans.length) {
    const dateStr = dateOfRepayment.toISOString();
    initAllLoansBalanceValuesForDate(loansPaymentsData, dateStr);
    for (loan of loans) {
      accrueInterest(loan);
      loansPaymentsData[loan.name].dailyBalanceData.dates.push(dateStr);
      loansPaymentsData[loan.name].dailyBalanceData.interest.push(loan.interest);
      loansPaymentsData[loan.name].dailyBalanceData.principal.push(loan.principal);
      loansPaymentsData[loan.name].dailyBalanceData.balance.push(loan.interest + loan.principal);
      updateAllLoansBalanceValuesForDate(loansPaymentsData, loan);
    };
    if (dateOfRepayment.getDate() === dueDay) {
      payments = allocatePayments(loans, payment);
      loans.forEach(function(loan, index) {
        pay(loan, payments[index]);
        recordLoanState(
          loan,
          dateOfRepayment,
          loansPaymentsData[loan.name].paymentsTable
        );
      });
    };
    // manual looping over loans is necessary
    // due to splicing of loan from list once its principal is 0
    for (i = 0; i < loans.length;) {
      loan = loans[i];
      if (loan.principal === 0) {
        loansPaymentsData[loan.name].lifetimeData.finalPaymentDate = new Date(dateOfRepayment.toLocaleDateString());
        loansPaymentsData[loan.name].lifetimeData.lifetimeInterestPaid = loan.lifetimeInterestPaid;
        loansPaymentsData[loan.name].lifetimeData.lifetimePrincipalPaid = loan.lifetimePrincipalPaid;
        updateAllLoansLifetimeValues(loansPaymentsData, loan, dateStr);
        loans.splice(i, 1);
        continue;
      };
      i++;
    };
    dateOfRepayment.setDate(dateOfRepayment.getDate() + 1);
  }
  return loansPaymentsData;
}

// set of functions to generate payment data of a loan to be graphed


function pay(loanObj, pmtAmount) {
  /**
  *
  * This function handles logic for making loan payments
  *
  */

  if (pmtAmount <= loanObj.interest) {
    loanObj.interest -= pmtAmount;
    loanObj.lifetimeInterestPaid += pmtAmount;
  } else {
    const pmtAmountToPrincipal = pmtAmount - loanObj.interest;
    loanObj.lifetimeInterestPaid += loanObj.interest;
    loanObj.interest = 0;
    if (pmtAmountToPrincipal >= loanObj.principal) {
      loanObj.lifetimePrincipalPaid += loanObj.principal;
      loanObj.principal = 0;
    } else {
      loanObj.lifetimePrincipalPaid += pmtAmountToPrincipal;
      loanObj.principal -= pmtAmountToPrincipal;
    };
  };
  loanObj.balance = loanObj.principal + loanObj.interest;
};


function accrueInterest(loanObj) {
  /**
  *
  * This function computes one day's accrual of interest for a loan
  * It modifies the interest property of the loanObj
  * Within the scope of this app, this function is only used during the repayment
  * of a loan, due to the nuances that automatic electronic payments introduce
  * to interest rates
  *
  */

  loanObj.interest += parseFloat((loanObj.principal * loanObj.dailyRate).toFixed(2));
};


function capitalizeInterest(loanObj) {
  loanObj.principal += loanObj.interest;
  loanObj.interest = 0;
};


function determineBeginRepaymentDate(gradDate) {
  if (gradDate.getMonth() < 6) {
    beginRepaymentDate = new Date(
      gradDate.getFullYear(),
      gradDate.getMonth() + 6,
      gradDate.getDate()
    );
  } else {
    beginRepaymentDate = new Date(
      gradDate.getFullYear() + 1,
      gradDate.getMonth() - 6,
      gradDate.getDate()
    );
  };
  return beginRepaymentDate;
};


function calculateBalanceAtBeginRepayment(
  subsidized,
  beginRepaymentDate,
  firstDisbursementDate,
  secondDisbursementDate,
  borrowAmt,
  borrowDailyRate
) {
  if (subsidized) {
    return borrowAmt
  } else {
    firstDisbursementDays = Math.round((beginRepaymentDate - firstDisbursementDate) / 86400000);
    secondDisbursementDays = Math.round((beginRepaymentDate - secondDisbursementDate) / 86400000);
    interest = parseFloat((((1 / 2) * borrowAmt * borrowDailyRate * firstDisbursementDays) + ((1 / 2) * borrowAmt * borrowDailyRate * secondDisbursementDays)).toFixed(2));
    return (borrowAmt + interest);
  };
};


function fastForwardLoan(form) {
  /**
   *
   * This function is used to transform borrowing data for loans that have
   * yet to enter repayment.
   *
   * Arguments:
   * form [HTML form object]: A form object containing all necessary loan data
   *
   * Returns:
   * loan [Loan]: a Loan.js Loan object.
   *
   */

  const borrowAmt = parseFloat(form.find("#amount").val());
  const borrowRate = parseFloat(form.find("#rate").val());
  const borrowMathRate = borrowRate / 100;
  const borrowDailyRate = borrowMathRate / 365.25;
  const firstDisbDate = new Date(form.find("#firstDisbDate").val());
  const secondDisbDate = new Date(form.find("#secondDisbDate").val());
  const subsidized = form.find("#subsidized").prop('checked');
  const gradDate = new Date(form.find("#gradDate").val());
  const autopay = form.find("#autopay").prop('checked');
  // const minpmt = parseFloat(form.find("#minpmt").val());
  const beginRepaymentDate = determineBeginRepaymentDate(gradDate);


  if (subsidized) {
    const paymentRate = (autopay) ? borrowRate - .25 : borrowRate;
    return new Loan(borrowAmt, paymentRate, null, beginRepaymentDate);
  } else {
    const balanceAtRepayment = calculateBalanceAtBeginRepayment(
      subsidized,
      beginRepaymentDate,
      firstDisbDate,
      secondDisbDate,
      borrowAmt,
      borrowDailyRate
    );
  const paymentRate = (autopay) ? borrowRate - .25 : borrowRate;
  return new Loan(balanceAtRepayment, paymentRate, null, beginRepaymentDate);
  };
};


function paymentSchedule(loanObj, pmtAmount) {

  // create a copy of the passed loanObj, as some values are changed
  // on the base object to compute loan payment data
  dummyLoan = Object.assign(Object.create(Object.getPrototypeOf(loanObj)), loanObj);

  console.log(dummyLoan);

  // core data structure to contain graph points and lifetime payment totals
  loanPaymentData = {
    dailyBalanceData : {
      dates : [],
      interest : [],
      principal : [],
      balance : []
    },
    lifetimeData : {
      lifetimeInterestPaid : 0,
      lifetimePrincipalPaid : 0,
      finalPaymentDate : null
    }
  };

  capitalizeInterest(dummyLoan);

  var startDate = new Date(dummyLoan.beginRepaymentDate.valueOf() - (1 * 86400000));
  var startDateStr = startDate.toISOString();
  loanPaymentData.dailyBalanceData.dates.push(startDateStr);
  loanPaymentData.dailyBalanceData.interest.push(dummyLoan.interest);
  loanPaymentData.dailyBalanceData.principal.push(dummyLoan.principal);
  loanPaymentData.dailyBalanceData.balance.push(dummyLoan.interest + dummyLoan.principal);

  var day_of_repayment = 0;
  while (dummyLoan.principal != 0 || dummyLoan.interest != 0) {
    var date = new Date(dummyLoan.beginRepaymentDate.valueOf() + (day_of_repayment * 86400000));
    var dateStr = date.toISOString();
    accrueInterest(dummyLoan);
    if (date.getDate() === dummyLoan.dueOn) {
      pay(dummyLoan, pmtAmount);
    };
    loanPaymentData.dailyBalanceData.dates.push(dateStr);
    loanPaymentData.dailyBalanceData.interest.push(dummyLoan.interest);
    loanPaymentData.dailyBalanceData.principal.push(dummyLoan.principal);
    loanPaymentData.dailyBalanceData.balance.push(dummyLoan.interest + dummyLoan.principal);
    day_of_repayment++;
    };
  loanPaymentData.lifetimeData.lifetimeInterestPaid = Math.round(dummyLoan.lifetimeInterestPaid, 2);
  loanPaymentData.lifetimeData.lifetimePrincipalPaid = Math.round(dummyLoan.lifetimePrincipalPaid, 2);
  return loanPaymentData;
};

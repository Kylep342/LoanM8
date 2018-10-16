// set of functions to generate payment data of a loan to be graphed


function pay(Loan, pmtAmount) {
  /**
  *
  * This function handles logic for making loan payments
  * Logic has been implemented to handle senseless use cases,
  * primarily, when a payment is smaller than a loan's interest
  *
  */
  if (pmtAmount <= Loan.interest) {
    Loan.interest -= pmtAmount;
    Loan.lifetimeInterestPaid += pmtAmount;
  } else {
    const pmtAmountToPrincipal = pmtAmount - Loan.interest;
    Loan.lifetimeInterestPaid += Loan.interest;
    Loan.interest = 0;
    if (pmtAmountToPrincipal >= Loan.principal) {
      Loan.lifetimePrincipalPaid += Loan.principal;
      Loan.principal = 0;
    } else {
      Loan.lifetimePrincipalPaid += pmtAmountToPrincipal;
      Loan.principal -= pmtAmountToPrincipal;
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


function determineBeginRepaymentDate(gradDate) {
  /**
  *
  * Function to determine when a loan will enter repayment
  * Params:
  *   gradDate [Date]: The date when the user graduates from school
  *
  * Returns:
  *   beginRepaymentDate [Date]: The date when the loan enters repayment
  *
  */
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
  /**
  *
  * Function to compute how much interest a loan will accrue between
  * the day it is disbursed and the day it enters repayment
  * All parameters are attributes of a Loan object
  * Params:
  *   subsizided [bool]: Flag denoting the loan's subsizied status
  *   beginRepaymentDate [date]: The date when the loan enters repayment
  *   firstDisbursementDate [date]: The date when the first half of the loan is disbursed to the school
  *   secondDisbursementDate [date]: The date when the second half of hte loan is disbursed to the school
  *   borrowAmt [float]: The amount of money loaned
  *   borrowDailyRate [float]: The daily rate with which interest is calculated
  *
  */
  if (subsidized) {
    return borrowAmt
  } else {
    firstDisbursementDays = Math.round((beginRepaymentDate - firstDisbursementDate) / 86400000);
    secondDisbursementDays = Math.round((beginRepaymentDate - secondDisbursementDate) / 86400000);
    interest = parseFloat((((1 / 2) * borrowAmt * borrowDailyRate * firstDisbursementDays) + ((1 / 2) * borrowAmt * borrowDailyRate * secondDisbursementDays)).toFixed(2));
    return (borrowAmt + interest);
  };
};

function determinePrincipal(balance, dailyRate, previousPayDate) {
  let today = new Date();
  return parseFloat((balance / (1 + (dailyRate * Math.round((today.valueOf() - previousPayDate.valueOf())/86400000)))).toFixed(2));
};


function formToLoan(form) {
  /**
  *
  * Function to parse the paymentForm and return a new Loan
  *
  */
  const balance = Math.abs(parseFloat(form.find("#balance").val()));
  const rate = Math.abs(parseFloat(form.find("#rate").val()));
  const dailyRate = rate / (36525);
  const previousPayDate = new Date(form.find("#previousPayDate").val());
  const dueOn = previousPayDate.getDate();
  const principal = determinePrincipal(balance, dailyRate, previousPayDate);
  const interest = balance - principal;
  const beginRepaymentDate = new Date(new Date().setHours(0, 0, 0, 0));

  return new Loan(principal, interest, rate, dueOn, beginRepaymentDate);
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
  const borrowAmt = Math.abs(parseFloat(form.find("#amount").val()));
  const borrowRate = Math.abs(parseFloat(form.find("#rate").val()));
  const borrowDecimalRate = borrowRate / 100;
  const borrowDailyRate = borrowDecimalRate / 365.25;
  const firstDisbDate = new Date(form.find("#firstDisbDate").val());
  const secondDisbDate = new Date(form.find("#secondDisbDate").val());
  const subsidized = form.find("#subsidized").prop('checked');
  const gradDate = new Date(form.find("#gradDate").val());
  const autopay = form.find("#autopay").prop('checked');
  // const minpmt = parseFloat(form.find("#minpmt").val());
  const beginRepaymentDate = determineBeginRepaymentDate(gradDate);
  const dueOn = beginRepaymentDate.getDate();

  const paymentRate = (autopay) ? borrowRate - .25 : borrowRate;
  const balanceAtRepayment = calculateBalanceAtBeginRepayment(
    subsidized,
    beginRepaymentDate,
    firstDisbDate,
    secondDisbDate,
    borrowAmt,
    borrowDailyRate
  );
  return new Loan(balanceAtRepayment, 0, paymentRate, dueOn, beginRepaymentDate);
};


function paymentSchedule(Loan, pmtAmount) {
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
      pay(dummyLoan, pmtAmount);
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

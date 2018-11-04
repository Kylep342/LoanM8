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
  /**
  *
  * Function to determine how much of an in-payment Loan's balance is principal
  *
  * Params:
  *   balance         [Float]:  The balance of the loan
  *   dailyRate       [Float]:  The rate at which interest is calculated daily
  *   previousPayDate [Date]:   The date the Loan was last paid
  *
  * Returns:
  *   principal       [Float]:  The amount of the Loan's balance that is principal
  */
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

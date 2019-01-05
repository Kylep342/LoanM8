function determineBeginRepaymentDate(gradDate) {
  /**
  *
  * Function to determine when a loan will enter repayment
  * Arguments:
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
  * Arguments:
  *   subsizided              [bool]:   Flag denoting the loan's subsizied status
  *   beginRepaymentDate      [date]:   The date when the loan enters repayment
  *   firstDisbursementDate   [date]:   The date when the first half of the loan is disbursed to the school
  *   secondDisbursementDate  [date]:   The date when the second half of hte loan is disbursed to the school
  *   borrowAmt               [float]:  The amount of money loaned
  *   borrowDailyRate         [float]:  The daily rate with which interest is calculated
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
  * Arguments:
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

function interestTillNextPayment(principal, dailyRate, previousPayDate, nextPayDate) {
  return principal * Math.floor((nextPayDate - previousPayDate) / 86400000) * dailyRate
}

function formToLoan() {
  /**
  *
  * Function to parse the paymentForm and return a new Loan
  *
  */

  const form = $("#payingLoanInputModal")

  const name = form.find("#name").val().replace(' ', '_')
  const balance = Math.abs(parseFloat(form.find("#balance").val()));
  const rate = Math.abs(parseFloat(form.find("#rate").val()));
  const dailyRate = rate / (36525);
  const minPmt = Math.abs(parseFloat(form.find("#minPmt").val()));
  const previousPayDate = new Date(sanitizeDate(form.find("#previousPayDate").val()));
  const dueOn = previousPayDate.getDate();
  const beginRepaymentDate = new Date(
    previousPayDate.getFullYear(),
    previousPayDate.getMonth() + 1,
    previousPayDate.getDate()
  );
  const principal = determinePrincipal(
    balance,
    dailyRate,
    previousPayDate
  );
  const interest = interestTillNextPayment(
    principal,
    dailyRate,
    previousPayDate,
    beginRepaymentDate
  );


  const loanElement = `
  <div id="loan-${name}" class="loanDisplay">
    <div class="row">
      <div class="col-sm-4">
        <span class="show bold">${name}</span>
        <span class="show">$${balance} at ${rate}%</span>
      </div>
      <div class="col-sm-4 float-left">
        <button class="btn btn-primary disabled" title="View Payments"><i class="fas fa-calendar"></i></button>
        <button class="btn btn-primary" title="Delete Loan" onclick="deleteLoan('loan-${name}')"><i class="fas fa-trash"></i></button>
      </div>
    <ul class="loan">
      <li class="name hidden">${name}</li>
      <li class="principal hidden">${principal}</li>
      <li class="interest hidden">${interest}</li>
      <li class="minPmt hidden">${minPmt}</li>
      <li class="rate hidden">${rate}</li>
      <li class="dueOn hidden">${dueOn}</li>
      <li class="beginRepaymentDate hidden">${beginRepaymentDate}</li>
    </ul>
  </div>
  `

  $("#loansList").append(loanElement)
};


function fastForwardLoan() {
  /**
   *
   * This function is used to transform borrowing data for loans that have
   * yet to enter repayment.
   *
   * Arguments:
   * none
   *
   * Returns:
   * none (adds html element with data to page)
   *
   */

  const form = $("#borrowingLoanInputModal")

  const name = form.find("#name").val()
  const borrowAmt = Math.abs(parseFloat(form.find("#amount").val()));
  const borrowRate = Math.abs(parseFloat(form.find("#rate").val()));
  const borrowDecimalRate = borrowRate / 100;
  const borrowDailyRate = borrowDecimalRate / 365.25;
  const firstDisbDate = new Date(sanitizeDate(form.find("#firstDisbDate").val()));
  const secondDisbDate = new Date(sanitizeDate(form.find("#secondDisbDate").val()));
  const subsidized = form.find("#subsidized").prop('checked');
  const gradDate = new Date(sanitizeDate(form.find("#gradDate").val()));
  const autopay = form.find("#autopay").prop('checked');
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

  // const minPmt = calculateMinPmt();

  const loanElement = `
  <div id="loan-${name}" class="loanDisplay">
    <div class="row">
      <div class="col-sm-4">
        <span class="show bold">${name}</span>
        <span class="show">$${balanceAtRepayment.toFixed(2)} at ${paymentRate}%</span>
      </div>
      <div class="col-sm-4 float-left">
        <button class="btn btn-primary disabled" title="View Payments"><i class="fas fa-calendar"></i></button>
        <button class="btn btn-primary" title="Delete Loan" onclick="deleteLoan('loan-${name}')"><i class="fas fa-trash"></i></button>
      </div>
      <ul class="loan">
        <li class="name hidden">${name}</li>
        <li class="principal hidden">${balanceAtRepayment}</li>
        <li class="interest hidden">0</li>
        <li class="minPmt hidden">0</li>
        <li class="rate hidden">${paymentRate}</li>
        <li class="dueOn hidden">${dueOn}</li>
        <li class="beginRepaymentDate hidden">${beginRepaymentDate}</li>
      </ul>
    </div>
  </div>
  `

  $("#loansList").append(loanElement)
};

function createLoans(sort=true) {
  /**
  *
  * This function creates Loan objects in memory from loans created by the user
  *
  * Arguments:
  *   none
  *
  * Returns:
  *   none
  *
  */
  let loans = [];
  const loanInputs = $('.loan');
  loanInputs.each(function(index) {
    name = loanInputs[index].getElementsByClassName('name')[0].innerText;
    principal = parseFloat(loanInputs[index].getElementsByClassName('principal')[0].innerText);
    interest = parseFloat(loanInputs[index].getElementsByClassName('interest')[0].innerText);
    minPmt = parseFloat(loanInputs[index].getElementsByClassName('minPmt')[0].innerText);
    rate = parseFloat(loanInputs[index].getElementsByClassName('rate')[0].innerText);
    dueOn = parseInt(loanInputs[index].getElementsByClassName('dueOn')[0].innerText);
    beginRepaymentDate = new Date(loanInputs[index].getElementsByClassName('beginRepaymentDate')[0].innerText);

    loans.push(new Loan(name, principal, interest, minPmt, rate, dueOn, beginRepaymentDate));
  });

  // sort will be implemented to indicate whether the repayment method is
  // snowball (false) or avalanche (true)
  // It will indicate how to sort the array of loans in a convenient manner
  if (sort) {
    loans.sort(function(loan1, loan2) {
      return loan2.rate - loan1.rate;
    });
  } else {
    loans.sort(function(loan1, loan2) {
      return loan1.balance - loan2.balance;
    });
  }

  return loans;
}

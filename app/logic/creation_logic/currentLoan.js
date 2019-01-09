// Functions needed to create Loans users currently have


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
function determinePrincipal(balance, dailyRate, previousPayDate) {
  let today = new Date();
  return parseFloat((balance / (1 + (dailyRate * Math.round((today.valueOf() - previousPayDate.valueOf())/86400000)))).toFixed(2));
};

/**
*
* TODO: fix this
*
* Function to compute interest from present date until next payment
* This is used for Loans in repayment to accurately keep track of balance changes
*
* Arguments:
*   principal       [Float]: The portion of the Loan's balance that is principal
*   dailyRate       [Float]: Decimal representing the daily rate of interest
*   previousPayDate [Date]:  The date the Loan was last paid
*   nextPayDate     [Date]:  The date the Loan will next be paid
*
*/
function interestTillNextPayment(principal, dailyRate, previousPayDate, nextPayDate) {
  return principal * Math.floor((nextPayDate - previousPayDate) / 86400000) * dailyRate
}

/**
*
* Function to parse the paymentForm and return a new Loan
*
*/
function formToLoan() {
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

// Functions needed to create Loans users plan on borrowing

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
  }
  return beginRepaymentDate;
}

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
function calculateBalanceAtBeginRepayment(
  subsidized,
  beginRepaymentDate,
  firstDisbursementDate,
  secondDisbursementDate,
  borrowAmt,
  borrowDailyRate
) {
  if (subsidized) {
    return borrowAmt;
  } else {
    firstDisbursementDays = Math.round(
      (beginRepaymentDate - firstDisbursementDate) / 86400000
    );
    secondDisbursementDays = Math.round(
      (beginRepaymentDate - secondDisbursementDate) / 86400000
    );
    interest = parseFloat(
      (
        (1 / 2) * borrowAmt * borrowDailyRate * firstDisbursementDays +
        (1 / 2) * borrowAmt * borrowDailyRate * secondDisbursementDays
      ).toFixed(2)
    );
    return borrowAmt + interest;
  }
}

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
function fastForwardLoan() {
  const form = $("#borrowingLoanInputModal");

  const name = form.find("#name").val();
  const borrowAmt = Math.abs(parseFloat(form.find("#amount").val()));
  const borrowRate = Math.abs(parseFloat(form.find("#rate").val()));
  const borrowDecimalRate = borrowRate / 100;
  const borrowDailyRate = borrowDecimalRate / 365.25;
  const firstDisbDate = new Date(
    sanitizeDate(form.find("#firstDisbDate").val())
  );
  const secondDisbDate = new Date(
    sanitizeDate(form.find("#secondDisbDate").val())
  );
  const subsidized = form.find("#subsidized").prop("checked");
  const gradDate = new Date(sanitizeDate(form.find("#gradDate").val()));
  const autopay = form.find("#autopay").prop("checked");
  const beginRepaymentDate = determineBeginRepaymentDate(gradDate);
  const dueOn = beginRepaymentDate.getDate();

  const paymentRate = autopay ? borrowRate - 0.25 : borrowRate;
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
        <span class="show">$${balanceAtRepayment.toFixed(
          2
        )} at ${paymentRate}%</span>
      </div>
      <div class="col-sm-4 float-left">
        <button class="btn btn-primary disabled" title="View Payments"><i class="fas fa-calendar"></i></button>
        <button class="btn btn-primary" title="Edit Loan" onclick="editLoan('loan-${name}')"><i class="fas fa-edit"></i></button>
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
        <li class="loanType hidden">future</li>
      </ul>
    </div>
  </div>
  `;

  existingLoan = document.getElementById(`loan-${name}`);

  if (!existingLoan) {
    $("#loansList").append(loanElement);
  } else {
    existingLoan.parentNode.removeChild(existingLoan);
    $("#loansList").append(loanElement);
  }
}

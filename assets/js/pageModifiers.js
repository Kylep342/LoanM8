// Collection of functions that modify the UI


function displayInputInterface() {
  let $inputInterface = $(".input-interface");
  $inputInterface.css('display', 'flex');
}

function addInputField() {
  let $field = $(".paymentInputTemplate").clone();
  $field.removeClass("paymentInputTemplate");
  $field.addClass("paymentInput");

  const $lastInput = $(".paymentInput").last();
  $lastInput.after($field);
};

function rmInputField() {
  if ($(".paymentInput").length > 1) {
    $(".paymentInput").last().remove()
  };
};

function toggleBorrowForm() {
  if ($("#inPaymentInputForm").length) {
    $("#inPaymentInputForm").remove();
    $("#formContainer").append(generateBorrowForm());
  } else if (!($("#inPaymentInputForm").length) && !($("#inBorrowingInputForm").length)) {
    displayInputInterface();
    $("#formContainer").append(generateBorrowForm());
  } else {
    return;
  };
};

function togglePaymentForm() {
  if ($("#inBorrowingInputForm").length) {
    $("#inBorrowingInputForm").remove();
    $("#formContainer").append(generatePaymentForm());
  } else if (!($("#inPaymentInputForm").length) && !($("#inBorrowingInputForm").length)) {
    displayInputInterface();
    $("#formContainer").append(generatePaymentForm());
  } else {
    return;
  };
};

function generateBorrowForm() {
  const formHTML = `
    <form id="inBorrowingInputForm">
      <div>
        <label for="amount">Loan amount:</label>
        <input type="number" step="0.01" min="0" id="amount" name="loanAmount" placeholder="e.g. 5500">
      </div>
      <div>
        <label for="rate">Interest rate:</label>
        <input type="number" step="0.01" min="0" id="rate" name="interestRate" placeholder="e.g. 5.25">
      </div>
      <div>
        <label for="firstDisbDate">First disbursement date::</label>
        <input type="date" id="firstDisbDate" name="firstDisbursementDate">
      </div>
      <div>
        <label for="secondDisbDate">Second disbursement date:</label>
        <input type="date" id="secondDisbDate" name="secondDisbursementDate">
      </div>
      <div>
        <label for="subsidized">Is this loan subsizied?</label>
        <input type="checkbox" id="subsidized" name="subsidizedStatus" value=true>
      </div>
      <div>
        <label for="gradDate">Graduation date:</label>
        <input type="date" id="gradDate" name="graduationDate">
      </div>
      <div>
        <label for="autopay">Will you use autopay?</label>
        <input type="checkbox" id="autopay" name="autopayStatus" value=true>
      </div>
    </form>
  `;
  return formHTML
};


function generatePaymentForm() {
  const formHTML = `
    <form id="inPaymentInputForm">
      <div>
        <label for="balance">Current balance:</label>
        <input type="number" step="0.01" min="0" id="balance" name="loanBalance" placeholder="e.g. 7429.41">
      </div>
      <div>
        <label for="rate">Interest rate:</label>
        <input type="number" step="0.01" min="0" id="rate" name="interestRate" placeholder="e.g. 5.25">
      </div>
      <div>
        <label for="previousPayDate">Last paid on:</label>
        <input type="date" id="previousPayDate" name="previousPayDate">
      </div>
    </form>
  `;
  return formHTML
};

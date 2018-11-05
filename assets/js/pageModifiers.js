// Collection of functions that modify the UI

function addInputField() {
  let input = (
    `
    <div class="paymentInput">
      <label>Payment amount:</label>
      <input class="payAmt" type="number" step="0.01" min="0">
    </div>
    `
  );

  $(".paymentInput").last().after(input);
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
    insertPaymentInputsInterface();
    insertAppButton();
    $("#formContainer").append(generateBorrowForm());
  } else {
    return;
  };
};

function togglePaymentForm() {
  if ($("#inBorrowingInputForm").length) {
    $("#inBorrowingInputForm").remove();
    $("#formContainer").append(generatePayingForm());
  } else if (!($("#inPaymentInputForm").length) && !($("#inBorrowingInputForm").length)) {
    insertPaymentInputsInterface();
    insertAppButton();
    $("#formContainer").append(generatePayingForm());
  } else {
    return;
  };
};

function closeModal() {
  $(".modal").remove();
}

function insertPaymentInputsInterface() {
  $("#formDivContainer").append(generatePaymentInputsInterface());
}

function insertAppButton() {
  $("#appButton").append(generateAppButton());
}

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

  $("#payments").append(input);
};

function rmInputField() {
  if ($(".paymentInput").length > 1) {
    $(".paymentInput").last().remove()
  };
};

function closeModal() {
  $(".modal").remove();
}

function backModal(modalFunction) {
  closeModal();
  modalFunction();
}

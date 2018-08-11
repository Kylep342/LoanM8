//


function addInputField() {
  var $field = $(".paymentInputTemplate").clone();
  $field.removeClass("paymentInputTemplate");
  $field.addClass("paymentInput");

  var $lastInput = $(".paymentInput").last();
  $lastInput.after($field);
};


function rmInputField() {
  if ($(".paymentInput").length > 1) {
    $(".paymentInput").last().remove()
  };
};


function toggleBorrowForm() {
  if ($("#paymentForm").length) {
    $("#paymentForm").remove();
    $("#formContainer").insert(generateBorrowForm());
  } else {
    return;
  };
};


function togglePaymentForm() {
  if ($("#borrowForm").length) {
    $("#borrowForm").remove();
    $("#formContainer").insert(generatePaymentForm());
  } else {
    return;
  };
};


function generateBorrowForm() {

};


function generatePaymentForm() {

};

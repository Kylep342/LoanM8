
function generatePaymentInputsInterface() {
return `
  <div id="inputForm" class="col-md-6">
    <h3>Put your loan information here</h3>
    <div id="formContainer"></div>
  </div>
  <div id="paymentForm" class="col-md-6">
    <h3>Experiment with monthly payment amounts here</h3>
    <div class="payments-form-div">
      <form>
        <div id="payments">
          <div id="firstInput" class="paymentInput">
            <label>Payment amount:</label>
            <input class="payAmt" type="number" step="0.01" min="0">
          </div>
        </div>
      </form>
    </div>
    <div class="payments-form-modifiers-div">
      <div class="row padding-left">
        <div id="addPayment" class="addInput float-left">
          <button class="btn btn-primary" type="button" onclick="addInputField()">+</button>
        </div>
        <div id="rmPayment" class="rmInput">
          <button class="btn btn-primary" type="button" onclick="rmInputField()">-</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

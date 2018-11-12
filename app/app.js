// functions to extract form data from the DOM and graph a loan

// Global namespace variable
// Used to hold data for output to csv
var LoanM8 = {
  paymentValues:  [],
  schedules:      {},
  lifetimeTotals: {},
  paymentsTables: {}
};

function loadApp() {
  document.body.innerHTML = `
    <div class="appContainer">
      <div class="page-header">
        <h1>LoanM8</h1>
        <a href="http://www.github.com/Kylep342/LoanM8" target="_blank"><i class="fab fa-github" href="http://www.github.com/Kylep342"></i></a>
      </div>
      <div class="container">
        <div class="row center">
          <span class="section-label">Enter information about your loans and payments below</span>
        </div>
        <div class="row input-interface" id="formDivContainer">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-3 center-child-text padding-none">
                <span class="section-label">Your loans</span>
              </div>
              <div class="col-md-3 padding-none">
                <button class="btn btn-primary" onclick="renderLoanTypeChoiceModal()">+</button>
              </div>
            </div>
            <div id="loansList" class="row loansList"></div>
          </div>
          <div id="paymentForm" class="col-md-6">
            <div>
              <span class="section-label">Experiment with monthly payment amounts here</span>
            </div>
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
        </div>
        <div class="row plot-app-buttion center" id="appButton">
          <button class="btn btn-primary" type="button">Project your loans</button>
        </div>
      </div>
      <div id="loanPaymentsGraph" class="graph"></div>
      <div id="loanLifetimeTotalsGraph" class="graph"></div>
      <div id="loanLifetimeTotalsTable" class="container"></div>
    </div>
    `;
}

function app() {
  // reset app state from previous run
  LoanM8.paymentValues = [];
  LoanM8.schedules = {};
  LoanM8.lifetimeTotals = {};
  LoanM8.paymentsTables = {};
  LoanM8.loan = null;
  plotPayments();
  tabulateLifetimeTotals();
}

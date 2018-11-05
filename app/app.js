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
  $("body").html(
      `
      <div class="page-header">
        <h1>LoanM8</h1>
        <a href="http://www.github.com/Kylep342/LoanM8" target="_blank"><i class="fab fa-github" href="http://www.github.com/Kylep342"></i></a>
      </div>
      <div class="container">
        <div class="row" id="choose_form_interface">
          <h3 class="center">Have you graduated school and begun paying your loans?</h3>
          <div class="col-md-6 no-padding right">
            <button class="btn btn-primary btn-width" type="button" onclick="togglePaymentForm()">Yes</button>
          </div>
          <div class="col-md-6 no-padding left">
            <button class="btn btn-primary btn-width" type="button" onclick="toggleBorrowForm()">No</button>
          </div>
        </div>
        <div class="row input-interface" id="formDivContainer"></div>
        <div class="row plot-app-buttion" id="appButton"></div>
      </div>
      <div id="loanPaymentsGraph" class="graph"></div>
      <div id="loanLifetimeTotalsGraph" class="graph"></div>
      <div id="loanLifetimeTotalsTable" class="container"></div>
      `
  );
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

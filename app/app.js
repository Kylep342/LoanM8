// functions to extract form data from the DOM and graph a loan

// Global namespace variable
// Used to hold data for output to csv
var LoanM8 = {
  paymentValues:  [],
  schedules:      {},
  lifetimeTotals: {},
  paymentsTables: {}
};

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

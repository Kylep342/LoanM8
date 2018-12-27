// functions to extract form data from the DOM and graph a loan

function loadApp() {
  document.body.innerHTML = `
    <div class="appContainer">
      <div class="page-header">
        <h1>LoanM8</h1>
        <a href="http://www.github.com/Kylep342/LoanM8" target="_blank"><i class="fab fa-github" href="http://www.github.com/Kylep342"></i></a>
      </div>
      <div class="container">
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
              <span class="section-label">Experiment with monthly payments below</span>
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
                <button class="btn btn-primary" type="button" onclick="addInputField()">+</button>
                <button class="btn btn-primary" type="button" onclick="rmInputField()">-</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row plot-app-buttion center margins" id="appButton">
          <button class="btn btn-primary" type="button" onclick="app()">Project your loans</button>
        </div>
      </div>
      <div id="loanPaymentsGraphs" class="graph"></div>
      <div id="loanLifetimeTotalsGraphs" class="graph"></div>
      <div id="loanLifetimeTotalsTables" class="container"></div>
    </div>
    `;
}

function app() {
  renderUI();
  // tabulateLifetimeTotals();
}

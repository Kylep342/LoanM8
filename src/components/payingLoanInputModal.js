/**
 *
 * Function to generate input interface for loans currently in repayment
 *
 */
function renderPayingLoanFormModal(loanDiv = null) {
  // close any other open modals
  closeModal();

  document.body.innerHTML += `
    <div id="payingLoanInputModal" class="modal">
      <div class="modal-content">
        <span class="section-label">Add a loan being repayed</span>
        <span class="close" onclick="closeModal()">&times;</span>
        <form id="inPaymentInputForm" class="margins">
          <div>
            <label for="name">Name:</label>
            <input type="string" id="name" name="loanName" value=${
              loanDiv ? loanDiv.getElementsByClassName("name")[0].innerText : ""
            }>
          </div>
          <div>
            <label for="balance">Current balance:</label>
            <input type="number" step="0.01" min="0" id="balance" name="loanBalance" placeholder="e.g. 7429.41" value=${
              loanDiv
                ? parseFloat(
                    loanDiv.getElementsByClassName("principal")[0].innerText
                  ) +
                  parseFloat(
                    loanDiv.getElementsByClassName("interest")[0].innerText
                  )
                : ""
            }>
          </div>
          <div>
            <label for="rate">Interest rate:</label>
            <input type="number" step="0.01" min="0" id="rate" name="interestRate" placeholder="e.g. 5.25" value=${
              loanDiv ? loanDiv.getElementsByClassName("rate")[0].innerText : ""
            }>
          </div>
          <div>
            <label for="minPmt">Minimum payment:</label>
            <input type="number" step="0.01" min="0" id="minPmt" name="minimumPayment" placeholder="e.g. 54.46" value=${
              loanDiv
                ? loanDiv.getElementsByClassName("minPmt")[0].innerText
                : ""
            }>
          </div>
          <div>
            <label for="previousPayDate">Last paid on:</label>
            <input type="date" id="previousPayDate" name="previousPayDate" value=${
              loanDiv
                ? loanDiv.getElementsByClassName("lastPaid")[0].innerText
                : ""
            }>
          </div>
        </form>
        <div class="float-left">
          <button class="btn btn-primary" onclick="formToLoan(); closeModal();">Create</button>
        </div>
        <div class="float-left">
          <button class="btn btn-primary" onclick="formToLoan(); renderLoanTypeChoiceModal();">Create another</button>
        </div>
        <div>
          <button class="btn btn-primary" onclick="backModal(renderLoanTypeChoiceModal);">Back</button>
        </div>
      </div>
    </div>
  `;
}

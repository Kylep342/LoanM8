function generateBorrowingFormModal() {
  return `
    <div id="borrowingLoanInputModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
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
        <div>
          <button class="button"
        </div>
      </div>
    </div>
  `;
};

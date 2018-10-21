function generatePayingForm() {
  return `
    <form id="inPaymentInputForm">
      <div>
        <label for="balance">Current balance:</label>
        <input type="number" step="0.01" min="0" id="balance" name="loanBalance" placeholder="e.g. 7429.41">
      </div>
      <div>
        <label for="rate">Interest rate:</label>
        <input type="number" step="0.01" min="0" id="rate" name="interestRate" placeholder="e.g. 5.25">
      </div>
      <div>
        <label for="previousPayDate">Last paid on:</label>
        <input type="date" id="previousPayDate" name="previousPayDate">
      </div>
    </form>
  `;
};

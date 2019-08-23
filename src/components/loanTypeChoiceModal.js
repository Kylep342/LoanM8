/**
 *
 * Function to generate 'menu' style interface for users to select which type of
 * loan to create
 *
 */
function renderLoanTypeChoiceModal() {
  closeModal();

  document.body.innerHTML += `
    <div id="borrowingLoanInputModal" class="modal">
      <div class="modal-content">
        <span class="section-label">Have you begun repaying this loan?</span>
        <span class="close" onclick="closeModal()">&times;</span>
        <div class="margins">
          <div class="float-left">
            <button class="btn btn-primary btn-width" type="button" onclick="renderPayingLoanFormModal()">Yes</button>
          </div>
          <div>
            <button class="btn btn-primary btn-width" type="button" onclick="renderBorrowingLoanFormModal()">No</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

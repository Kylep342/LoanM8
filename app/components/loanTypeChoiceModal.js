function renderLoanTypeChoiceModal() {
  document.body.innerHTML += `
    <div id="borrowingLoanInputModal" class="modal">
      <div class="modal-content">
          <span class="section-label">Have you begun repaying this loan?</span>
          <span class="close" onclick="closeModal()">&times;</span>
          <div>
            <div class="float-left">
              <button class="btn btn-primary btn-width" type="button" onclick="renderPayingLoanFormModal(); ">Yes</button>
            </div>
            <div>
              <button class="btn btn-primary btn-width" type="button" onclick="renderBorrowingLoanFormModal();">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

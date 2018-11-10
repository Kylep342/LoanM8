function generateLoanTypeChoiceModal() {
  document.body.innerHTML += `
    <div id="borrowingLoanInputModal" class="modal">
      <div class="modal-content">
        <span class="section-label">Have you begun repaying this loan?</span>
        <span class="close" onclick="closeModal()">&times;</span>
        <div>
        </div>
        <div>
          <button class="button"></button>
        </div>
      </div>
    </div>
  `;
};

}

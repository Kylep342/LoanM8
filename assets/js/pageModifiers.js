// Collection of functions that modify the UI

function addInputField() {
  let input = (
    `
    <div class="paymentInput">
      <label>Payment amount:</label>
      <input class="payAmt" type="number" step="0.01" min="0">
    </div>
    `
  );

  $("#payments").append(input);
};

function rmInputField() {
  if ($(".paymentInput").length > 1) {
    $(".paymentInput").last().remove()
  };
};

function deleteLoan(id) {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

function closeModal() {
  $(".modal").remove();
}

function backModal(modalFunction) {
  closeModal();
  modalFunction();
}

function addLoanMenuButton(loan) {
  const loanNavButton = `
  <button class="btn btn-primary" onclick="displayGraph('${loan.name}')">${loan.name.replace('_', ' ')}</button>
  `
  const $loanNavMenu = $('#loanNavMenu')
  $loanNavMenu.append(loanNavButton)
}

function activateVisualizer(id) {
  LoanM8.activeComponent = id;
  if (LoanM8.activeGraph !== undefined) {
    displayGraph(LoanM8.activeGraph);
  }
}

function displayGraph(loanName) {
  let graphs = $('.uiGraph');
  graphs.each(function(index) {
    graphs[index].style.display = 'none';
  });

  let prefix = null;
  switch (LoanM8.activeComponent) {
    case 'loanPaymentsGraphs':
      prefix = 'payments-graph-'
      break;
    case 'loanLifetimeTotalsGraphs':
      prefix = 'lifetime-totals-graph-'
      break;
    case 'loanLifetimeTotalsTables':
      prefix = 'foo'
      break;
    default:
      prefix = 'payments-graph-';
      break;
  }
  id = prefix + loanName;
  document.getElementById(id).style.display = 'inline-block';
  LoanM8.activeGraph = loanName;
}

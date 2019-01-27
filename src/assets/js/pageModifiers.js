// Collection of functions that modify the UI

function addInputField () {
  let input = `
    <div class="paymentInput">
      <label>Payment amount:</label>
      <input class="payAmt" type="number" step="0.01" min="0">
    </div>
  `

  $('#payments').append(input)
};

/**
*
* Function to remove a payment input field
*
*/
function rmInputField () {
  if ($('.paymentInput').length > 1) {
    $('.paymentInput').last().remove()
  };
};

/**
*
* Function to delete a loan from the page
*
* Arguments:
*   id [String]:  HTML element id of loan to delete
*/
function deleteLoan (id) {
  let element = document.getElementById(id)
  element.parentNode.removeChild(element)
}

/**
*
* Function to close a modal
*
*/
function closeModal () {
  let modals = $('.modal')
  modals.each(function (index) {
    modals[index].remove()
  })
}

/**
*
* Function to provide going back in a sequence of modals
* Arguments:
*   modalFunction [Function]: Name of function that generates the previous modal
*
*/
function backModal (modalFunction) {
  closeModal()
  modalFunction()
}

/**
*
* Function to add a button to toggle viewing of a loan's graphs
* Arguments:
*   loan [Loan]:  Loan object representing the desired loan
*
*/
function addLoanMenuButton (loan) {
  const loanNavButton = `
  <button class="btn btn-primary" onclick="displayGraph('${loan.name}')">${loan.name.replace('_', ' ')}</button>
  `
  const $loanNavMenu = $('#loanNavMenu')
  $loanNavMenu.append(loanNavButton)
}

/**
 *
 *
 *
 */
function addAllLoansMenuButton () {
  const loanNavButton = `
  <button class="btn btn-primary" onclick="displayGraph('All_Loans')">All Loans</button>
  `
  const $loanNavMenu = $('#loanNavMenu')
  $loanNavMenu.append(loanNavButton)
}

/**
*
* Function to toggle which type of visualization is displayed on the screen
* Arguments:
*   id [String]:  HTML element id representing container for all visualizations
*                 of the desired type
*
*/
function activateVisualizer (id) {
  LoanM8.activeComponent = id
  if (LoanM8.activeLoan !== undefined) {
    displayGraph(LoanM8.activeLoan)
  }
}

/**
*
* Function to toggle the current visualization type for the desired loan
* Arguments:
*   loanName [String]: Name of desired loan to render visualization
*
*/
function displayGraph (loanName) {
  let graphs = $('.uiVisualizer')
  graphs.each(function (index) {
    graphs[index].style.display = 'none'
  })

  let prefix = null
  switch (LoanM8.activeComponent) {
    case 'loanPaymentsGraphs':
      prefix = 'payments-graph-'
      break
    case 'loanLifetimeTotalsGraphs':
      prefix = 'lifetime-totals-graph-'
      break
    case 'loanLifetimeTotalsTables':
      prefix = 'lifetime-totals-table-'
      break
    default:
      prefix = 'payments-graph-'
      break
  }
  id = prefix + loanName
  document.getElementById(id).style.display = 'inline-block'
  LoanM8.activeLoan = loanName
}

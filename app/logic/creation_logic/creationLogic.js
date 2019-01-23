// Functions needed to create data from user interaction


/**
*
* Funciton to create Loan objects in memory from loan information entered by the user
*
* Arguments:
*   sort  [bool (true)]:  Puts Loans in 'avalanche' (true) or 'snowball' (false) order
*
* Returns:
*   loans [Array]:        Array of Loan objects for loans to use
*
*/
function createLoans(sort=true) {
  let loans = [];
  const loanInputs = $('.loan');
  loanInputs.each(function(index) {
    name = loanInputs[index].getElementsByClassName('name')[0].innerText;
    principal = parseFloat(loanInputs[index].getElementsByClassName('principal')[0].innerText);
    interest = parseFloat(loanInputs[index].getElementsByClassName('interest')[0].innerText);
    minPmt = parseFloat(loanInputs[index].getElementsByClassName('minPmt')[0].innerText);
    rate = parseFloat(loanInputs[index].getElementsByClassName('rate')[0].innerText);
    dueOn = parseInt(loanInputs[index].getElementsByClassName('dueOn')[0].innerText);
    beginRepaymentDate = new Date(loanInputs[index].getElementsByClassName('beginRepaymentDate')[0].innerText);

    loans.push(new Loan(name, principal, interest, minPmt, rate, dueOn, beginRepaymentDate));
  });

  // sort will be implemented to indicate whether the repayment method is
  // snowball (false) or avalanche (true)
  if (sort) {
    loans.sort(function(loan1, loan2) {
      return loan2.rate - loan1.rate;
    });
  } else {
    loans.sort(function(loan1, loan2) {
      return loan1.balance - loan2.balance;
    });
  }
  return loans;
}

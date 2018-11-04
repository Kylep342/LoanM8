/**
*
*
*
*/

function tabulateLifetimeTotals() {
  /**
  *
  *
  *
  */
  let tableHeaders = [`<th>Payment Amounts</th>`];
  let tableRows = [];
  LoanM8.paymentValues.forEach(function(pmtAmt) {
    tableHeaders.push(`<th>$${pmtAmt}</th>`);
    let row = [`<td>$${pmtAmt}</td>`];
    let interest = LoanM8.lifetimeTotals[pmtAmt].interest;
    let finalPaymentDate = LoanM8.lifetimeTotals[pmtAmt].finalPaymentDate;
    LoanM8.paymentValues.forEach(function(otherPmtAmt) {
      if (pmtAmt === otherPmtAmt) {
        row.push(`<td>--</td>`);
      } else {
        const lifetimeAmtDiff = (
          LoanM8.lifetimeTotals[pmtAmt].interest -
          LoanM8.lifetimeTotals[otherPmtAmt].interest
        );
        const amtPrefix = lifetimeAmtDiff < 0 ? '-' : '';

        const payOff = LoanM8.lifetimeTotals[pmtAmt].finalPaymentDate;
        const otherPayOff = LoanM8.lifetimeTotals[otherPmtAmt].finalPaymentDate;
        const totalMonthsDiff = (
          ((payOff.getFullYear() - otherPayOff.getFullYear()) * 12) +
          (payOff.getMonth() - otherPayOff.getMonth())
        );
        const descriptor = (totalMonthsDiff < 0) ? 'later' : 'sooner';
        const yearsDiff = Math.floor(Math.abs(totalMonthsDiff) / 12);
        const monthsDiff = Math.abs(totalMonthsDiff) % 12

        const lifetimeTimeDiff = (
          `${yearsDiff ? yearsDiff.toString() + (yearsDiff === 1 ? ' year ' : ' years ') : ''}`
          + `${monthsDiff ? monthsDiff.toString() + (monthsDiff === 1 ? ' month ' : ' months ') : ''}`
          + `${descriptor}`
        );

        row.push(`<td>${amtPrefix}$${Math.abs(lifetimeAmtDiff).toFixed(2)}, ${lifetimeTimeDiff}`);
      }
    });
    tableRows.push(`<tr>${row.join('')}</tr>`);
  });

  const element = (
    `<div class="row center">
      <h4>
        Total Money and Time Comparison
      </h4>
    </div>
    <div class="row center">
      <p>
        Compare payment amounts in the leftmost column with those across the top row.
      </p>
    </div>
    <div class="row">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>${tableHeaders.join('')}</tr>
        </thead>
        <tbody>
          ${tableRows.join('')}
        </tbody>
      </table>
    </div>`
  );

  $("#loanLifetimeTotalsTable").html(element);
};

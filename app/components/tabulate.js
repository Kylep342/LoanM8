/**
*
* TODO
*
*/
function tabulateLifetimeTotals(loanName, lifetimeTotalsData, pmtsArray) {
  let tableHeaders = [`<th>Payment Amounts</th>`];
  let tableRows = [];
  // revisit
  for (let pmt of pmtsArray) {
    const pmtAsStr = String(pmt);
    tableHeaders.push(`<th>$${pmtAsStr}</th>`);
    let row = [`<td>$${pmtAsStr}</td>`];
    /* let interest = lifetimeTotalsData[pmtAsStr].interest;
    let finalPaymentDate = lifetimeTotalsData[pmtAsStr].finalPaymentDate; */
    for (let otherPmt of pmtsArray) {
      const otherPmtAsStr = String(otherPmt);
      if (pmtAsStr === otherPmtAsStr) {
        row.push(`<td>--</td>`);
      } else {
        const lifetimeAmtDiff = (
          lifetimeTotalsData[pmtAsStr].interest -
          lifetimeTotalsData[otherPmtAsStr].interest
        );
        const amtPrefix = lifetimeAmtDiff < 0 ? '-' : '';

        const payOff = new Date(lifetimeTotalsData[pmtAsStr].finalPaymentDate);
        const otherPayOff = new Date(lifetimeTotalsData[otherPmtAsStr].finalPaymentDate);
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
    };
    tableRows.push(`<tr>${row.join('')}</tr>`);
  };

  const tableID = `lifetime-totals-table-${loanName}`;
  const tableDiv = `
    <div id=${tableID} class="uiVisualizer">
      <div class="row center">
        <h4>
          Total Money and Time Comparison - ${loanName.replace('_', ' ')}
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
      </div>
    </div>
  `;

  $("#loanLifetimeTotalsTables").append(tableDiv);
};

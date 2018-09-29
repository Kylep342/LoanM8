// functions to extract form data from the DOM and graph a loan

// Global namespace variable
// Used to hold data for output to csv
var LoanM8 = {
  paymentValues:  [],
  schedules:      {},
  lifetimeTotals: {}
};

function preparePlots(loanObj, pmt, plotlyPaymentsData, plotlyLifetimeTotalsData, index) {
  /**
  *
  * This function generates plotting data for Plotly to consume to render graphs
  *
  */

  // store color for graphs
  const plotColor = graphColor(index);

  // generate payment data
  const paymentData = paymentSchedule(loanObj, pmt);
  const paymentPlan = paymentData.dailyBalanceData;
  const lifetimeTotals = paymentData.lifetimeData;

  // update app state
  LoanM8.paymentValues.push(pmt);

  LoanM8.schedules[pmt] = {
    'dates':      paymentPlan.dates,
    'principal':  paymentPlan.principal,
    'interest':   paymentPlan.interest
  };

  LoanM8.lifetimeTotals[pmt] = {
    'interest':         lifetimeTotals.lifetimeInterestPaid,
    'finalPaymentDate': lifetimeTotals.finalPaymentDate
  };

  // prepare graphing objects
  const graphLabel = '$' + String(pmt) + '/month';

  const paymentPlot = {
    x:        paymentPlan.dates,
    y:        paymentPlan.balance,
    name:     graphLabel,
    type:     'scatter',
    marker: {
      color:  plotColor
    }
  };

  plotlyPaymentsData.push(paymentPlot);

  plotlyLifetimeTotalsData[0].x.push(graphLabel);
  plotlyLifetimeTotalsData[0].y.push(lifetimeTotals.lifetimePrincipalPaid);
  plotlyLifetimeTotalsData[0].marker.color.push(plotColor)
  plotlyLifetimeTotalsData[1].x.push(graphLabel);
  plotlyLifetimeTotalsData[1].y.push(lifetimeTotals.lifetimeInterestPaid);
  plotlyLifetimeTotalsData[1].marker.color.push(plotColor)
};

function plotPayments() {
  /**
  *
  * Function that generates the graphs on the page
  *
  */

  const userLoan = $("#inBorrowingInputForm").length ? fastForwardLoan($("#inBorrowingInputForm")) : formToLoan($("#inPaymentInputForm"));

  LoanM8.loan = userLoan;

  // The plotly.*Data variables are arrays due to Plotly needing arrays for data
  let plotlyPaymentsData = [];
  let plotlyLifetimeTotalsData = [
    principals = {
      x:        [],
      y:        [],
      width:    .4,
      name:     'Principal',
      type:     'bar',
      marker: {
        color:  []
      }
    },
    interests = {
      x:          [],
      y:          [],
      width:      .4,
      name:       'Interest',
      type:       'bar',
      marker: {
        color:    [],
        opacity:  0.7
      }
    }
  ];

  // Process each payment input amount provided by user and insert data into containers
  const paymentInputs = $("#payments").find(".payAmt");
  paymentInputs.each(function(index) {
    paymentInputs[index].value === "" ? void(0) : preparePlots(
      userLoan,
      Math.abs(parseFloat(paymentInputs[index].value)),
      plotlyPaymentsData,
      plotlyLifetimeTotalsData,
      index
    );
  });

  // for the Payments plot: Prepare the layout object and then plot
  const paymentsLayout = {
    title:            'Loan Balances Over Time',
    yaxis: {
      tickprefix:     '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanPaymentsGraph', plotlyPaymentsData, paymentsLayout);


  const lifetimeLayout = {
    title:            'Total Amounts Paid Per Payment',
    barmode:          'stack',
    showlegend:       false,
    yaxis: {
      tickprefix:     '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanLifetimeTotalsGraph', plotlyLifetimeTotalsData, lifetimeLayout);
};

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
        let lifetimeAmtDiff = (
          LoanM8.lifetimeTotals[pmtAmt].interest -
          LoanM8.lifetimeTotals[otherPmtAmt].interest
        ).toFixed(2);

        let payOff = LoanM8.lifetimeTotals[pmtAmt].finalPaymentDate;
        let otherPayOff = LoanM8.lifetimeTotals[otherPmtAmt].finalPaymentDate;
        let monthsDiff = (
          ((payOff.getFullYear() - otherPayOff.getFullYear()) * 12) +
          (payOff.getMonth() - otherPayOff.getMonth())
        );
        let descriptor = (monthsDiff < 0) ? 'later' : 'sooner';
        let lifetimeTimeDiff = (
          `${Math.floor(Math.abs(monthsDiff) / 12)} years, ` +
          `${Math.floor(Math.abs(monthsDiff) % 12)} months ${descriptor}`
        );

        row.push(`<td>$${lifetimeAmtDiff}, ${lifetimeTimeDiff}`);
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
    <div class="row">
      <table class="table">
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

function app() {
  // reset app state from previous run
  LoanM8.schedules = {};
  LoanM8.lifetimeTotals = {};
  LoanM8.paymentValues = [];
  LoanM8.loan = null;
  plotPayments();
  tabulateLifetimeTotals();
}

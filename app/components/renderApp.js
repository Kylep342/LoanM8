/**
*
*
*
*/

function preparePlotData(
  Loan,
  pmt,
  loanPaymentsData,
  plotlyPmtsInputs,
  plotlyTotalsInputs,
  index
) {
  /**
  *
  * This function generates plotting data for Plotly to consume to render graphs
  *
  */

  // store color for graphs
  const plotColor = graphColor(index);

  // generate payment data
  const paymentPlan = loanPaymentsData.dailyBalanceData;
  const lifetimeTotals = loanPaymentsData.lifetimeData;

  // prepare graphing objects
  const graphLabel = `${Loan.name.replace('_', ' ')} at $${String(pmt)}/month`;

  const paymentPlot = {
    x:        paymentPlan.dates,
    y:        paymentPlan.balance,
    name:     graphLabel,
    type:     'scatter',
    marker: {
      color:  plotColor
    }
  };

  plotlyPmtsInputs.push(paymentPlot);

  plotlyTotalsInputs[0].x.push(graphLabel);
  plotlyTotalsInputs[0].y.push(lifetimeTotals.lifetimePrincipalPaid);
  plotlyTotalsInputs[0].marker.color.push(plotColor)
  plotlyTotalsInputs[1].x.push(graphLabel);
  plotlyTotalsInputs[1].y.push(lifetimeTotals.lifetimeInterestPaid);
  plotlyTotalsInputs[1].marker.color.push(plotColor)
};

function drawPlots(
  Loan,
  plotlyPaymentsInputs,
  plotlyTotalsInputs
) {

  const paymentsGraphID = `payments-graph-${Loan.name}`;
  const paymentsGraphDiv = `<div id=${paymentsGraphID} class="paymentsGraph paymentsGraph-${Loan.name}"></div>`;
  $('#loanPaymentsGraphs').append(paymentsGraphDiv);

  const paymentsLayout = {
    title:            `Loan Balances Over Time - ${Loan.name.replace('_', ' ')}`,
    yaxis: {
      hoverformat:    '$.2f'
    }
  };
  Plotly.newPlot(
    paymentsGraphID,
    plotlyPaymentsInputs,
    paymentsLayout
  );

  const totalsGraphID = `lifetime-totals-graph-${Loan.name}`;
  const totalsGraphDiv = `<div id=${totalsGraphID} class="totalsGraph totalsGraph-${Loan.name}"></div>`;
  $('#loanLifetimeTotalsGraphs').append(totalsGraphDiv);

  const lifetimeLayout = {
    title:            `Total Amounts Paid Per Payment - ${Loan.name.replace('_', ' ')}`,
    barmode:          'stack',
    showlegend:       false,
    yaxis: {
      hoverformat:    '$.2f'
    }
  };
  Plotly.newPlot(
    totalsGraphID,
    plotlyTotalsInputs,
    lifetimeLayout);
}

function renderUI() {
  /**
  *
  * Function that generates the graphs on the page
  *
  */
  const tabs = $('.uiVisualizer');
  tabs.each(function(index) {
    tabs[index]
  });

  document.getElementById('loanPaymentsGraphs').innerHTML = '';
  document.getElementById('loanLifetimeTotalsGraphs').innerHTML = '';
  document.getElementById('loanNavMenu').innerHTML = '';

  const loansArray = createLoans();

  // The plotly.*Data variables are arrays due to Plotly needing arrays for data
  let plotlyPmtsInputs = {};
  let plotlyTotalsInputs = {};
  for (loan of loansArray) {
    plotlyPmtsInputs[loan.name] = [];
    plotlyTotalsInputs[loan.name] = [
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
  }

  // Process each payment input amount provided by user and insert data into containers
  const paymentInputs = $("#payments").find(".payAmt");
  paymentInputs.each(function(index) {
    // if (paymentInputs[index].value === "") { return }
    let pmt = Math.abs(parseFloat(paymentInputs[index].value))
    pmtSchedules = paymentSchedules(loansArray, pmt)

    for (loan of loansArray) {
      preparePlotData(
        loan,
        pmt,
        pmtSchedules[loan.name],
        plotlyPmtsInputs[loan.name],
        plotlyTotalsInputs[loan.name],
        index
      );
      drawPlots(
        loan,
        plotlyPmtsInputs[loan.name],
        plotlyTotalsInputs[loan.name]
      );
    }
  });
  for (loan of loansArray) {
    addLoanMenuButton(loan);
  }
}

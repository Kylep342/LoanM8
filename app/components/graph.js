/**
*
*
*
*/

function preparePlots(
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
  const graphLabel = `${Loan.name} at $${String(pmt)}/month`;

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

function plotPayments() {
  /**
  *
  * Function that generates the graphs on the page
  *
  */

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
    paymentInputs[index].value === "" ? void(0) : pmt = Math.abs(parseFloat(paymentInputs[index].value))
    pmtSchedules = paymentSchedules(loansArray, pmt)

    for (loan of loansArray) {
      preparePlots(
        loan,
        pmt,
        pmtSchedules[loan.name],
        plotlyPmtsInputs,
        plotlyTotalsInputs,
        index
      );
    }
  });

  //NOTE: This logic needs to be moved, and done for each loan/pmt graph combo
  //NOTE: and then drawn into hidden elements, toggalable by buttos yet to be added
  // for the Payments plot: Prepare the layout object and then plot
  const paymentsLayout = {
    title:            'Loan Balances Over Time',
    yaxis: {
      tickprefix:     '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanPaymentsGraph', plotlyPmtsInputs, paymentsLayout);


  const lifetimeLayout = {
    title:            'Total Amounts Paid Per Payment',
    barmode:          'stack',
    showlegend:       false,
    yaxis: {
      tickprefix:     '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanLifetimeTotalsGraph', plotlyTotalsInputs, lifetimeLayout);
};

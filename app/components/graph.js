/**
*
*
*
*/

function preparePlots(Loan, pmt, loanPaymentsData, index) {
  /**
  *
  * This function generates plotting data for Plotly to consume to render graphs
  *
  */

  // store color for graphs
  const plotColor = graphColor(index);

  // generate payment data
  const paymentPlan = loanPaymentData.dailyBalanceData;
  const lifetimeTotals = loanPaymentData.lifetimeData;

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

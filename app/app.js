// functions to extract form data from the DOM and graph a loan


function preparePlots(loanObj, pmt, plotlyPaymentsData, plotlyLifetimeTotalsData, index) {
  /**
  *
  * This function generates plotting data for Plotly to consume to render graphs
  *
  */

  const paymentData = paymentSchedule(loanObj, pmt);
  const paymentPlan = paymentData.dailyBalanceData;
  const lifetimeTotals = paymentData.lifetimeData;

  const graphLabel = '$' + String(pmt) + '/month';

  const paymentPlot = {
    x: paymentPlan.dates,
    y: paymentPlan.balance,
    name: graphLabel,
    type: 'scatter',
    marker: {
      color: graphColor(index)
    }
  };

  plotlyPaymentsData.push(paymentPlot);

  plotlyLifetimeTotalsData[0].x.push(graphLabel);
  plotlyLifetimeTotalsData[0].y.push(lifetimeTotals.lifetimePrincipalPaid);
  plotlyLifetimeTotalsData[0].marker.color.push(graphColor(index))
  plotlyLifetimeTotalsData[1].x.push(graphLabel);
  plotlyLifetimeTotalsData[1].y.push(lifetimeTotals.lifetimeInterestPaid);
  plotlyLifetimeTotalsData[1].marker.color.push(graphColor(index))
};

// This is the main() or app() function
function plotPayments() {
  /**
  *
  *
  *
  */

  const userLoan = $("#inBorrowingInputForm").length ? fastForwardLoan($("#inBorrowingInputForm")) : formToLoan($("#inPaymentInputForm"));

  // The plotly.*Data variables are arrays due to Plotly needing arrays for data
  let plotlyPaymentsData = [];
  let plotlyLifetimeTotalsData = [
    principals = {
      x: [],
      y: [],
      width: .4,
      name: 'Principal',
      type: 'bar',
      marker: {
        color: []
      }
    },
    interests = {
      x: [],
      y: [],
      width: .4,
      name: 'Interest',
      type: 'bar',
      marker: {
        color: [],
        opacity: 0.7
      }
    }
  ];

  // Process each payment input amount provided by user and insert data into containers
  const paymentInputs = $("#payments").find(".payAmt");
  paymentInputs.each(function(index) {
    preparePlots(userLoan, parseFloat(paymentInputs[index].value), plotlyPaymentsData, plotlyLifetimeTotalsData, index);
  });

  // for the Payments plot: Prepare the layout object and then plot
  const paymentsLayout = {
    title: 'Loan Balances Over Time',
    yaxis: {
      tickprefix: '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanPaymentsGraph', plotlyPaymentsData, paymentsLayout);


  const lifetimeLayout = {
    title: 'Total Amounts Paid Per Payment',
    barmode: 'stack',
    showlegend: false,
    yaxis: {
      tickprefix: '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanLifetimeTotalsGraph', plotlyLifetimeTotalsData, lifetimeLayout);
};

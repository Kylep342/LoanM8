// functions to process user input data and generate visualizations

/**
*
* Function to prepare Plotly data containers
* Arguments:
*   Loan                [Loan]:   Loan to which the payment data belongs
*   pmt                 [float]:  Dollar amount representing user's total monthly payment
*   loanPaymentsData    [object]: JSON containing daily balance data, as well as lifetime total statistics, of payments for the Loan
*   plotlyPmtsInputs    [array]:  Array container to hold plotly graphing objects
*   plotlyTotalsInputs  [array]:  Array container to hold plotly graphing objects
*   index               [int]:    integer representing the loan's position in the loanArray (used for color selection)
*
*/
function preparePlotData(
  pmt,
  loanPaymentsData,
  plotlyPmtsInputs,
  plotlyTotalsInputs,
  index
) {
  // store color for graphs
  const plotColor = graphColor(index);

  // generate payment data
  const paymentPlan = loanPaymentsData.dailyBalanceData;
  const lifetimeTotals = loanPaymentsData.lifetimeData;

  // prepare graphing objects
  const graphLabel = `$${String(pmt)}/month`;

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
  plotlyTotalsInputs[0].marker.color.push(plotColor);
  plotlyTotalsInputs[1].x.push(graphLabel);
  plotlyTotalsInputs[1].y.push(lifetimeTotals.lifetimeInterestPaid);
  plotlyTotalsInputs[1].marker.color.push(plotColor);
};

/**
*
* Function to generate plots for a loan and draw them on the screen
* Arguments:
*   Loan                [Loan]:   Loan to which the payment data belongs
*   plotlyPmtsInputs    [array]:  Array container to hold plotly graphing objects
*   plotlyTotalsInputs  [array]:  Array container to hold plotly graphing objects
*
*/
function drawPlots(
  loanName,
  plotlyPmtsInputs,
  plotlyTotalsInputs
) {

  const paymentsGraphID = `payments-graph-${loanName}`;
  const paymentsGraphDiv = `<div id=${paymentsGraphID} class="uiGraph"></div>`;
  $('#loanPaymentsGraphs').append(paymentsGraphDiv);

  const paymentsLayout = {
    title:            `Loan Balances Over Time - ${loanName.replace('_', ' ')}`,
    yaxis: {
      hoverformat:    '$.2f'
    }
  };
  Plotly.newPlot(
    paymentsGraphID,
    plotlyPmtsInputs,
    paymentsLayout
  );

  const totalsGraphID = `lifetime-totals-graph-${loanName}`;
  const totalsGraphDiv = `<div id=${totalsGraphID} class="uiGraph"></div>`;
  $('#loanLifetimeTotalsGraphs').append(totalsGraphDiv);

  const lifetimeLayout = {
    title:            `Total Amounts Paid Per Payment - ${loanName.replace('_', ' ')}`,
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

/**
*
* Function to orchestrate the collection of plotting data and the generation of
* graphs
*
*/
function renderUI() {
  const loansArray = createLoans();

  let tabs = $('.navTab');
  tabs.each(function(index) {
    tabs[index].style.display = 'block';
  });

  document.getElementById('loanPaymentsGraphs').innerHTML = '';
  document.getElementById('loanLifetimeTotalsGraphs').innerHTML = '';
  document.getElementById('loanNavMenu').innerHTML = '';

  // The plotly.*Data variables are arrays due to Plotly needing arrays for data
  let plotlyPmtsInputs = {};
  let plotlyTotalsInputs = {};

  plotlyPmtsInputs['All Loans'] = [];
  plotlyTotalsInputs['All Loans'] = [
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
    let pmt = Math.abs(parseFloat(paymentInputs[index].value));
    pmtSchedules = paymentSchedules(loansArray, pmt);

    preparePlotData(
      pmt,
      pmtSchedules['All Loans'],
      plotlyPmtsInputs['All Loans'],
      plotlyTotalsInputs['All Loans'],
      index
    );
    drawPlots(
      'All_Loans',
      plotlyPmtsInputs['All Loans'],
      plotlyTotalsInputs['All Loans']
    );

    for (loan of loansArray) {
      preparePlotData(
        pmt,
        pmtSchedules[loan.name],
        plotlyPmtsInputs[loan.name],
        plotlyTotalsInputs[loan.name],
        index
      );
      drawPlots(
        loan.name,
        plotlyPmtsInputs[loan.name],
        plotlyTotalsInputs[loan.name]
      );
    }
  });
  addAllLoansMenuButton();
  for (loan of loansArray) {
    addLoanMenuButton(loan);
  }
  LoanM8.activeGraph = loansArray[0].name;
  activateVisualizer('loanPaymentsGraphs');
}

// functions to extract form data from the DOM and graph a loan


function addInputField() {
  var $field = $(".paymentInputTemplate").clone();
  $field.removeClass("paymentInputTemplate");
  $field.addClass("paymentInput");

  var $firstInput = $("#firstInput");
  $firstInput.after($field);
};


function createLoan(form) {
  /**
  *
  * This function parses the passed form and creates a loan object
  *
  */

  const loanAmt = parseInt(form.find("#amount").val());
  const loanRate = parseFloat(form.find("#rate").val());
  const firstDate = form.find("#firstDisbDate").val();
  const secondDate = form.find("#secondDisbDate").val();
  const subsidized = form.find("#subsidized").prop('checked');
  const gradDate = form.find("#gradDate").val();
  const autopay = form.find("#autopay").prop('checked');
  const minpmt = parseFloat(form.find("#minpmt").val());

  var loanObj = new Loan(
    loanAmt,
    loanRate,
    firstDate,
    secondDate,
    subsidized,
    gradDate,
    autopay,
    minpmt
  );

  return loanObj;
};


function preparePlots(loanObj, pmt, plotlyPaymentsData, plotlyLifetimeTotalsData, index) {
  /**
  *
  * This function generates plotting data for Plotly to consume to render graphs
  *
  */

  var paymentData = paymentSchedule(loanObj, pmt);
  var paymentPlan = paymentData.dailyBalanceData;
  var lifetimeTotals = paymentData.lifetimeData;

  var graphLabel = '$' + String(pmt) + '/month';

  var paymentPlot = {
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

  const userLoan = createLoan($("#inputForm"));

  // The plotly.*Data variables are arrays due to Plotly needing arrays for data
  var plotlyPaymentsData = [];
  var plotlyLifetimeTotalsData = [
    principals = {
      x: [],
      y: [],
      name: 'Principal',
      type: 'bar',
      marker: {
        color: []
      }
    },
    interests = {
      x: [],
      y: [],
      name: 'Interest',
      type: 'bar',
      marker: {
        color: [],
        opacity: 0.7
      }
    }
  ];

  // Process each payment input amount provided by user and insert data into containers
  var paymentInputs = $("#payments").find(".payAmt");
  paymentInputs.each(function(index) {
    preparePlots(userLoan, paymentInputs[index].value, plotlyPaymentsData, plotlyLifetimeTotalsData, index);
  });

  // for the Payments plot: Prepare the layout object and then plot
  var paymentsLayout = {
    title: 'Loan Balances Over Time',
    yaxis: {
      tickprefix: '$',
      showtickprefix: 'first'
    }
  };
  Plotly.react('loanPaymentsGraph', plotlyPaymentsData, paymentsLayout);


  var lifetimeLayout = {
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

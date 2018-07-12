// functions to extract form data from the DOM and graph a loan


function createLoan(form) {
  /**
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

function preparePlots(loanObj, pmt, plotlyPaymentsData, plotlyLifetimeTotalsData) {
  /**
  */
  var paymentData = paymentSchedule(loanObj, pmt);
  var paymentPlan = paymentData.dailyBalanceData;
  var lifetimeTotals = paymentData.lifetimeData;

  var graphLabel = '$' + String(pmt) + '/month';

  var paymentPlot = {
    x: paymentPlan.dates,
    y: paymentPlan.balance,
    name: graphLabel,
    type: 'scatter'
  };

  plotlyPaymentsData.push(paymentPlot);

  plotlyLifetimeTotalsData[0].x.push(graphLabel);
  plotlyLifetimeTotalsData[0].y.push(lifetimeTotals.lifetimePrincipalPaid);
  plotlyLifetimeTotalsData[1].x.push(graphLabel);
  plotlyLifetimeTotalsData[1].y.push(lifetimeTotals.lifetimeInterestPaid);
};

function addInputField() {
  var $field = $(".paymentInputTemplate").clone();
  $field.removeClass("paymentInputTemplate");
  $field.addClass("paymentInput");

  var $addInput = $(".addInput");
  $addInput.before($field);
};

function plotPayments() {
  /**
  */
  var plotlyPaymentsData = [];
  var plotlyLifetimeTotalsData = [
    principals = {
      x: [],
      y: [],
      name: 'Principal',
      type: 'bar'
    },
    interests = {
      x: [],
      y: [],
      name: 'Interest',
      type: 'bar'
    }
  ];

  var paymentInputs = $("#payments").find(".payAmt");
  paymentInputs.each(function(index) {
    preparePlots(createLoan($("#inputForm")), paymentInputs[index].value, plotlyPaymentsData, plotlyLifetimeTotalsData);
  });

  var layout = {title: 'Loan Balances Over Time'};

  Plotly.react('loanPaymentsGraph', plotlyPaymentsData, layout);

  var layout2 = {
    title: 'Total Amounts Paid Per Payment',
    barmode: 'stack'
  };

  Plotly.react('loanLifetimeTotalsGraph', plotlyLifetimeTotalsData, layout2);
};

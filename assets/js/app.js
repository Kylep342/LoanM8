// functions to extract form data from the DOM and graph a loan


function addInputField() {
  var $field = $(".paymentInputTemplate").clone();
  $field.removeClass("paymentInputTemplate");
  $field.addClass("paymentInput");

  var $addInput = $(".addInput");
  $addInput.before($field);
};


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


function preparePlots(loanObj, pmt, plotlyPaymentsData, plotlyLifetimeTotalsData, index) {
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


function plotPayments() {
  /**
  */
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

  var paymentInputs = $("#payments").find(".payAmt");
  paymentInputs.each(function(index) {
    preparePlots(createLoan($("#inputForm")), paymentInputs[index].value, plotlyPaymentsData, plotlyLifetimeTotalsData, index);
  });

  var layout = {title: 'Loan Balances Over Time'};

  Plotly.react('loanPaymentsGraph', plotlyPaymentsData, layout);

  var layout2 = {
    title: 'Total Amounts Paid Per Payment',
    barmode: 'stack',
    showlegend: false
  };

  Plotly.react('loanLifetimeTotalsGraph', plotlyLifetimeTotalsData, layout2);
};

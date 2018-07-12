// set of functions to generate payment data of a loan to be graphed



function pay(loanObj, pmtAmount) {
  if (pmtAmount < loanObj.interest) {
    loanObj.interest -= pmtAmount;
    loanObj.lifetimeInterestPaid += pmtAmount;
  } else {
    var pmtAmountToPrincipal = pmtAmount - loanObj.interest;
    loanObj.lifetimeInterestPaid += loanObj.interest;
    loanObj.interest = 0;
    if (pmtAmountToPrincipal > loanObj.principal) {
      loanObj.principal -= loanObj.principal;
      loanObj.lifetimePrincipalPaid += pmtAmountToPrincipal;
    } else {
      loanObj.principal -= pmtAmountToPrincipal;
      loanObj.lifetimePrincipalPaid += pmtAmountToPrincipal;
    };
  };
};

function accrueInterest(loanObj) {
  loanObj.interest += parseFloat((loanObj.principal * loanObj.paymentDailyRate).toFixed(2));
};

function capitalizeInterest(loanObj) {
  loanObj.principal += loanObj.interest;
  loanObj.interest = 0;
};

function paymentSchedule(loanObj, pmtAmount) {

  // create a copy of the passed loanObj, as some values are changed
  // on the base object to compute loan payment data
  dummyLoan = Object.assign(Object.create(Object.getPrototypeOf(loanObj)), loanObj);

  // core data structure to contain graph points and lifetime payment totals
  loanPaymentData = {
    dailyBalanceData : {
      dates : [],
      interest : [],
      principal : [],
      balance : []
    },
    lifetimeData : {
      lifetimeInterestPaid : 0,
      lifetimePrincipalPaid : 0,
      finalPaymentDate : null
    }
  };

  dummyLoan.interest = dummyLoan.interestAtBeginRepayment;
  capitalizeInterest(dummyLoan);
  var days = Math.round((dummyLoan.endRepaymentDate - dummyLoan.beginRepaymentDate) / 86400000);

  var day;
  for (day = 0; day < days; day++) {
    var date = new Date(dummyLoan.beginRepaymentDate.valueOf() + day * 86400000);
    var dateStr = date.toISOString();
    accrueInterest(dummyLoan);
    if (date.getDate() === dummyLoan.dueOn) {
      pay(dummyLoan, pmtAmount);
    };
    loanPaymentData.dailyBalanceData.dates.push(dateStr);
    loanPaymentData.dailyBalanceData.interest.push(dummyLoan.interest);
    loanPaymentData.dailyBalanceData.principal.push(dummyLoan.principal);
    loanPaymentData.dailyBalanceData.balance.push(dummyLoan.interest + dummyLoan.principal);
    if (dummyLoan.interest === 0 && dummyLoan.principal === 0) {
      loanPaymentData.finalPaymentDate = date;
      break;
    };
  };
  loanPaymentData.lifetimeData.lifetimeInterestPaid = Math.round(dummyLoan.lifetimeInterestPaid, 2);
  loanPaymentData.lifetimeData.lifetimePrincipalPaid = Math.round(dummyLoan.lifetimePrincipalPaid, 2);
  return loanPaymentData;
};

const loanCalculatorInputEls = getEls(".loan-calculator-container input");

loanCalculatorInputEls.forEach((el) =>
  el.addEventListener("change", calculateLoan)
);

function calculateLoan() {
  const loanAmount = Number(getEl("#loan-amount").value);
  const interestRate = Number(getEl("#interest-rate").value);
  const monthsToPay = Number(getEl("#months-to-pay").value);
  const monthlyPaymentEl = getEl(".monthly-payment .amount");
  let monthlyPayment = 0;
  let interest = 0;

  interest = (loanAmount * (interestRate * 0.01)) / monthsToPay;
  monthlyPayment = loanAmount / monthsToPay + interest;
  monthlyPaymentEl.innerText = monthlyPayment.toFixed(2);
}

function getEl(selector) {
  return document.querySelector(selector);
}

function getEls(selector) {
  return document.querySelectorAll(selector);
}

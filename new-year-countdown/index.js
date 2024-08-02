countdown();
const countdownInterval = setInterval(countdown, 1000);

function countdown() {
  const newYear = new Date("January 1, 2025 00:00:00");
  const newYearMS = newYear.getTime();
  const now = new Date().getTime();
  const distance = newYearMS - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  getEl(".year").innerText = newYear.getFullYear();
  getEl(".days .val").innerText = days;
  getEl(".hours .val").innerText = hours;
  getEl(".mins .val").innerText = minutes;
  getEl(".secs .val").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdownInterval);
    getEl(".counter-container").innerHTML = "HAPPY NEW YEAR!";
  }
}

function getEl(selector) {
  return document.querySelector(selector);
}

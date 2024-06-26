const hoursEl = document.querySelector(".time-item.hours span");
const minutesEl = document.querySelector(".time-item.minutes span");
const secondsEl = document.querySelector(".time-item.seconds span");
const amPmEl = document.querySelector(".time-item.am__pm span");

setTime();

function setTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;
  const hoursStr = hours < 10 ? "0" + hours : hours;

  hoursEl.innerText = hoursStr;
  minutesEl.innerText = minutesStr;
  secondsEl.innerText = secondsStr;
  amPmEl.innerText = ampm;

  setTimeout(setTime, 1000);
}

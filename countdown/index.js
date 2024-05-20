const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// always add x days to current date
const {
  tempYear,
  tempMonth,
  tempDay,
  tempHours,
  tempMinutes,
  tempSeconds,
  daysToAdd,
} = getTempDate();
const endDate = new Date(
  tempYear,
  tempMonth,
  tempDay + daysToAdd,
  tempHours,
  tempMinutes,
  tempSeconds
);
// set a fix end date
// const endDate = new Date(2024, 5, 21, 17, 0, 0);
console.log(endDate);
const deadlineContainerEl = document.querySelector(".deadline-container");
const infoEl = document.querySelector(".info");
let countdownInterval = undefined;

window.addEventListener("DOMContentLoaded", () => {
  setCountdownDate();
  initCountdown();
  countdownInterval = setInterval(initCountdown, 1000);
});

function getTempDate() {
  const tempDate = new Date();
  const tempYear = tempDate.getFullYear();
  const tempMonth = tempDate.getMonth();
  const tempDay = tempDate.getDate();
  const tempHours = tempDate.getHours();
  const tempMinutes = tempDate.getMinutes();
  const tempSeconds = tempDate.getSeconds();
  const daysToAdd = 2;

  return {
    tempYear,
    tempMonth,
    tempDay,
    tempHours,
    tempMinutes,
    tempSeconds,
    daysToAdd,
  };
}

function getDateInfo(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const weekday = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    year,
    month,
    day,
    weekday,
    hours,
    minutes,
  };
}

function setCountdownDate() {
  const { year, month, day, weekday, hours, minutes } = getDateInfo(endDate);

  const time = convert24HourTo12Hour(`${hours}:${minutes}`);
  infoEl.innerHTML = `
    <strong>Giveaway Ends On ${weekdays[weekday]}, ${day} ${months[month]} ${year} ${time}</strong>
  `;
}

function initCountdown() {
  const startDate = new Date();
  const timeDiff = getTimeDifference(startDate, endDate);
  const { days, hours, minutes, seconds, totalDiff } = timeDiff;
  if (totalDiff < 0) {
    deadlineContainerEl.innerHTML = "<h3>Giveaway Ended</h3>";
    clearInterval(countdownInterval);
  } else {
    deadlineContainerEl.innerHTML = `
    <div>
      <span class="num days">${days}</span>
      <span class="letter days">Day${formatPlural(days)}</span>
    </div>
    <div>
      <span class="num hours">${hours}</span>
      <span class="letter hours">Hour${formatPlural(hours)}</span>
    </div>
    <div>
      <span class="num mins">${minutes}</span>
      <span class="letter mins">Min${formatPlural(minutes)}</span>
    </div>
    <div>
      <span class="num secs">${seconds}</span>
      <span class="letter secs">Sec${formatPlural(seconds)}</span>
    </div>
  `;
  }
}

function formatPlural(time) {
  return time > 1 ? "s" : "";
}

function getTimeDifference(startDate, endDate) {
  // Calculate the total difference in milliseconds
  const totalDiff = endDate - startDate;

  // Calculate the difference in days
  const days = Math.floor(totalDiff / (1000 * 60 * 60 * 24));

  // Calculate the difference in hours
  const hours = Math.floor(
    (totalDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  // Calculate the difference in minutes
  const minutes = Math.floor((totalDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Calculate the difference in seconds
  const seconds = Math.floor((totalDiff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalDiff,
  };
}

function convert24HourTo12Hour(time24) {
  // Split the input time string into hours and minutes
  let [hours, minutes] = time24.split(":");

  // Convert hours from string to number
  hours = parseInt(hours);

  // Determine AM or PM
  let period = hours >= 12 ? "pm" : "am";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle the case of 0 hours (midnight)

  // Format the result as a string
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let time12 = `${hours}:${minutes}${period}`;

  return time12;
}

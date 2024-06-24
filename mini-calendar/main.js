const monthNameEl = document.querySelector(".month-name");
const dayNameEl = document.querySelector(".day-name");
const dayNumberEl = document.querySelector(".day-number");
const yearEl = document.querySelector(".year");
const today = new Date();

monthNameEl.innerText = getMonthName(today);
dayNameEl.innerText = getDayName(today);
dayNumberEl.innerText = today.getDate();
yearEl.innerText = today.getFullYear();

function getDayName(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay();
  return days[dayIndex];
}

function getMonthName(date) {
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
  const monthIndex = date.getMonth();
  return months[monthIndex];
}

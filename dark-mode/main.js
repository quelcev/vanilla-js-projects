const darkModeCheckbox = document.querySelector(".dark-mode-switch input");
const darkModeTextEl = document.querySelector(".nav-center > span");
const darkMode = JSON.parse(localStorage.getItem("darkMode")) ?? false;

window.addEventListener("DOMContentLoaded", () => setDarkMode(darkMode));
darkModeCheckbox.addEventListener("change", (e) =>
  setDarkMode(e.target.checked)
);

function setDarkMode(isDarkMode) {
  if (isDarkMode) {
    darkModeTextEl.textContent = "Dark Mode";
    document.body.classList.add("dark-mode");
    darkModeCheckbox.checked = true;
  } else {
    darkModeTextEl.textContent = "Light Mode";
    document.body.classList.remove("dark-mode");
    darkModeCheckbox.checked = false;
  }
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
}

const darkModeInput = document.querySelector(".dark-mode-switch input");
const darkModeEl = document.querySelector(".dark-mode-switch");
const darkModeTextEl = document.querySelector(".nav-center > span");
let darkMode = JSON.parse(localStorage.getItem("darkMode")) ?? false;

window.addEventListener("DOMContentLoaded", () => setDarkMode(darkMode));
darkModeInput.addEventListener("change", (e) => {
  darkMode = e.target.checked;
  setDarkMode();
});
darkModeEl.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 || e.keyCode === 32) {
    darkMode = !darkMode;
    setDarkMode();
  }
});

function setDarkMode() {
  if (darkMode) {
    darkModeTextEl.textContent = "Dark Mode";
    document.body.classList.add("dark-mode");
    darkModeInput.checked = true;
  } else {
    darkModeTextEl.textContent = "Light Mode";
    document.body.classList.remove("dark-mode");
    darkModeInput.checked = false;
  }
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

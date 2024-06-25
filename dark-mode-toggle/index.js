const darkModeInput = document.getElementById("dark-mode");

window.addEventListener("DOMContentLoaded", () => {
  darkModeInput.checked = JSON.parse(localStorage.getItem("mode"));
  updateBody();
});
darkModeInput.addEventListener("input", () => {
  updateBody();
  updateLocalStorage();
});

function updateBody() {
  if (darkModeInput.checked) {
    document.body.style.backgroundColor = "#000";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
}
function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(darkModeInput.checked));
}
